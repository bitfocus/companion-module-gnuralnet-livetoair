const { InstanceStatus } = require('@companion-module/base')

const API = require('./api')
const xml2js = require('xml2js');
var util = require('util');

module.exports = {
	/**
	 * Inits the polling logic
	 */
	initPolling() {
		// Cleanup old interval
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		// Setup polling if enabled
		if (this.pollTimer === undefined && this.config.poll_interval > 0) {
			this.pollTimer = setInterval(() => {
				this.getState.bind(this)()
			}, this.config.poll_interval)
		}
	},

	stopPolling() {
		//this.log('error', 'Stopping Polling due to Server error.');
	
		clearInterval(this.pollTimer);
		delete this.pollTimer
	},

	async getState() {
		const connection = new API(this.config);

		const cmd = 'State'
	
		const result = await connection.sendRequest(cmd);

		//do something with xml
		try {
			if (result && result.response && result.response.data) {				
				const data = result.response.data;

				try {
					let myThis = this;
					xml2js.parseStringPromise(data /*, options */)
					.then(function (result) {
						myThis.processStateData(result);

						myThis.checkVariables();
						myThis.checkFeedbacks();

						myThis.updateStatus(InstanceStatus.Ok)
					})
					.catch(function (error) {
						// Failed
						if (myThis.config.verbose) {
							myThis.log('error', `Error Parsing Data: ${error}`);
						}
						this.updateStatus(InstanceStatus.UnknownError)
						myThis.stopPolling();
					});
				}
				catch(error) {
					if (this.config.verbose) {
						this.log('error', `Error Getting Data: ${error}`);
					}
					this.updateStatus(InstanceStatus.UnknownError)
					this.stopPolling();
				}
			}
			else {
				if (!this.errorCount) {
					if (this.config.verbose) {
						this.log('error', `Error Getting Data: No response received from server. Is the Server Online?`);
					}
					this.updateStatus(InstanceStatus.UnknownError)
				}
				
				// Cleanup polling
				this.stopPolling()
	
				this.errorCount++;
			}	
		}
		catch(error) {
			if (this.config.verbose) {
				this.log('error', `Error Getting Data: ${error}`);
			}
			this.updateStatus(InstanceStatus.UnknownError)
			// Cleanup polling
			this.stopPolling()
		}
	},

	processStateData(data) {
		try {
			this.data = {
				channels: []
			}
	
			this.data.selected_channel = data['LTA']['SelectedChannel'][0]
			this.data.operator_mic_level = Number(data['LTA']['OperatorMicrophoneSliderValue'][0])
			this.data.operator_mic_muted = (data['LTA']['OperatorMicrophoneIsMuted'][0] == 'True' ? true : false)
			this.data.operator_speakers_level = Number(data['LTA']['OperatorSpeakersSliderValue'][0])
			this.data.operator_speakers_muted = (data['LTA']['OperatorSpeakersAreMuted'][0] == 'True' ? true : false)
			this.data.ptt_all_active = (data['LTA']['PTTAllIsActive'][0] == 'True' ? true : false)
			this.data.ptt_group_active = (data['LTA']['PTTGroupIsActive'][0] == 'True' ? true : false)
			this.data.ptt_single_active = (data['LTA']['PTTSingleIsActive'][0] == 'True' ? true : false)
			this.data.callinqueue_selected = data['LTA']['SelectedCallInQueue'][0]
			this.data.callinqueue_guest_name = data['LTA']['SelectedCallInQueueGuest'][0]['Name'][0]
			this.data.callinqueue_guest_isonline = (data['LTA']['SelectedCallInQueueGuest'][0]['IsOnline'][0] == 'True' ? true : false)

			guestData = data['LTA']['Guest'];
	
			for (let i = 0; i < guestData.length; i++) {
				guestObj = {}
				
				guestObj.channel = parseInt(guestData[i]['ChannelNumber'][0])
				guestObj.name = guestData[i]['Name'][0]
				guestObj.notes = guestData[i]['Notes'][0]
				guestObj.group = guestData[i]['Group'][0]
				guestObj.online = (guestData[i]['IsOnline'][0] == 'True' ? true : false)
				guestObj.selected = (guestData[i]['IsSelected'][0] == 'True' ? true : false)
				guestObj.guest_state = guestData[i]['GuestState'][0]
				guestObj.interaction_state = guestData[i]['InteractionState'][0]
				guestObj.audiooutput_level = Number(guestData[i]['AudioOutputSliderValue'][0])
				guestObj.audiooutput_muted = (guestData[i]['AudioOutputIsMuted'][0] == 'True' ? true : false)
				guestObj.audioreturn_level = Number(guestData[i]['AudioReturnSliderValue'][0])
				guestObj.audioreturn_muted = (guestData[i]['AudioReturnIsMuted'][0] == 'True' ? true : false)
	
				this.data.channels.push(guestObj)
			}
	
			if ((guestData.length !== this.config.channel_count) && (this.warnedAboutConfig !== true)) {
				//throw a warning to the log, maybe the user misconfigured their config with the wrong channel count
				this.log('info', `The data returned from LTA indicates ${guestData.length} channels, but the module is configured for ${this.config.channel_count} channels.`);
				this.warnedAboutConfig = true;
			}
		}
		catch(error) {
			this.updateStatus(InstanceStatus.UnknownError)
			this.log('error', `Error processing data: ${error.toString()}`)
			this.stopPolling();
		}
	}
}