const { InstanceStatus } = require('@companion-module/base')

const constants = require('./constants')

const API = require('./api')

module.exports = {

	async sendCommand(command, payload) {
		if (command !== undefined) {
			try {
				const connection = new API(this.config)

				let cmd = `Macro/?Command=${command}`
				if (payload !== undefined) {
					cmd += `&Payload=${payload}`
				}

				if (this.config.verbose) {
					this.log('debug', `Sending command: ${cmd}`);
				}

				const result = await connection.sendRequest(cmd)

				if (result.status === 'success') {
					this.updateStatus(InstanceStatus.Ok)
				} else {
					this.updateStatus(InstanceStatus.UnknownError)
					this.log('error', result.status);
				}
			} catch (error) {
				this.updateStatus(InstanceStatus.UnknownError)

				let errorText = String(error);

				if (errorText.match('ECONNREFUSED')) {
					this.log('error', 'Unable to connect to the server.')
					this.updateStatus(InstanceStatus.ConnectionFailure)
				}
				else if (errorText.match('ETIMEDOUT') || errorText.match('ENOTFOUND')) {
					this.log('error', 'Connection to server has timed out.')
					this.updateStatus(InstanceStatus.ConnectionFailure)
				}
				else {
					this.log('error', `An error has occurred: ${errorText}`);
				}
			}
		}
	},

	initActions() {
		let actions = {}

		actions['CallOrOnAirChannel'] = {
			name: 'Call or On Air Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('CallOrOnAirChannel', event.options.channel);
			},
		}

		actions['MuteChannelAudioOutput'] = {
			name: 'Mute Channel Audio Output',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('MuteChannelAudioOutput', event.options.channel);
			},
		}


		actions['MuteChannelAudioReturn'] = {
			name: 'Mute Channel Audio Return',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('MuteChannelAudioReturn', event.options.channel);
			},
		}

		actions['MuteOperatorMicrophone'] = {
			name: 'Mute Operator Microphone',
			options: [],
			callback: async (event) => {
				this.sendCommand('MuteOperatorMicrophone');
			},
		}

		actions['MuteOperatorSpeakers'] = {
			name: 'Mute Operator Speakers',
			options: [],
			callback: async (event) => {
				this.sendCommand('MuteOperatorSpeakers');
			},
		}

		actions['OffAirAllChannels'] = {
			name: 'Off Air All Channels',
			options: [],
			callback: async (event) => {
				this.sendCommand('OffAirAllChannels');
			},
		}

		actions['OffAirChannel'] = {
			name: 'Off Air Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('OffAirChannel', event.options.channel);
			},
		}

		actions['OffAirDropOrClearChannel'] = {
			name: 'Off Air, Drop, or Clear Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('OffAirDropOrClearChannel', event.options.channel);
			},
		}

		actions['OnAirAllChannels'] = {
			name: 'On Air All Channels',
			options: [],
			callback: async (event) => {
				this.sendCommand('OnAirAllChannels');
			},
		}

		actions['OnAirChannel'] = {
			name: 'On Air Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('OnAirChannel', event.options.channel);
			},
		}

		actions['SelectChannel'] = {
			name: 'Select Channel',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS[0].id,
					choices: this.CHANNELS
				}
			],
			callback: async (event) => {
				this.sendCommand('SelectChannel', event.options.channel);
			},
		}

		actions['ToggleMuteChannelAudioOutput'] = {
			name: 'Toggle Mute Channel Audio Output',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('ToggleMuteChannelAudioOutput', event.options.channel);
			},
		}

		actions['ToggleMuteChannelAudioReturn'] = {
			name: 'Toggle Mute Channel Audio Return',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('ToggleMuteChannelAudioReturn', event.options.channel);
			},
		}

		actions['ToggleMuteOperatorMicrophone'] = {
			name: 'Toggle Mute Operator Microphone',
			options: [],
			callback: async (event) => {
				this.sendCommand('ToggleMuteOperatorMicrophone');
			},
		}

		actions['ToggleMuteOperatorSpeakers'] = {
			name: 'Toggle Mute Operator Speakers',
			options: [],
			callback: async (event) => {
				this.sendCommand('ToggleMuteOperatorSpeakers');
			},
		}

		actions['TogglePTTAll'] = {
			name: 'Toggle PTT All',
			options: [],
			callback: async (event) => {
				this.sendCommand('TogglePTTAll');
			},
		}

		actions['TogglePTTGroup'] = {
			name: 'Toggle PTT Group',
			options: [],
			callback: async (event) => {
				this.sendCommand('TogglePTTGroup');
			},
		}

		actions['TogglePTTSingle'] = {
			name: 'Toggle PTT Single',
			options: [],
			callback: async (event) => {
				this.sendCommand('TogglePTTSingle');
			},
		}

		actions['UnmuteChannelAudioOutput'] = {
			name: 'Unmute Channel Audio Output',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('UnmuteChannelAudioOutput', event.options.channel);
			},
		}

		actions['UnmuteChannelAudioReturn'] = {
			name: 'Unmute Channel Audio Return',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			callback: async (event) => {
				this.sendCommand('UnmuteChannelAudioReturn', event.options.channel);
			},
		}

		actions['UnmuteOperatorMicrophone'] = {
			name: 'Unmute Operator Microphone',
			options: [],
			callback: async (event) => {
				this.sendCommand('UnmuteOperatorMicrophone');
			},
		}

		actions['UnmuteOperatorSpeakers'] = {
			name: 'Unmute Operator Speakers',
			options: [],
			callback: async (event) => {
				this.sendCommand('UnmuteOperatorSpeakers');
			},
		}

		actions['SetChannelAudioOutputVolume'] = {
			name: 'Set Channel Audio Output Volume',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				},
				{
					id: 'volume',
					type: 'number',
					label: 'Volume (0.00 to 1.00)',
					default: 0.5,
					min: 0.00,
					max: 1.00,
					step: 0.01,
					range: true
				}
			],
			callback: async (event) => {
				this.sendCommand('SetChannelAudioOutputVolume', event.options.channel + ',' + event.options.volume);
			},
		}

		actions['SetChannelAudioReturnVolume'] = {
			name: 'Set Channel Audio Return Volume',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				},
				{
					id: 'volume',
					type: 'number',
					label: 'Volume (0.00 to 1.00)',
					default: 0.5,
					min: 0.00,
					max: 1.00,
					step: 0.01,
					range: true
				}
			],
			callback: async (event) => {
				this.sendCommand('SetChannelAudioReturnVolume', event.options.channel + ',' + event.options.volume);
			},
		}

		actions['SetOperatorSpeakersVolume'] = {
			name: 'Set Operator Speakers Volume',
			options: [
				{
					id: 'volume',
					type: 'number',
					label: 'Volume (0.00 to 1.00)',
					default: 0.5,
					min: 0.00,
					max: 1.00,
					step: 0.01,
					range: true
				}
			],
			callback: async (event) => {
				this.sendCommand('SetOperatorSpeakersVolume', event.options.volume);
			},
		}

		actions['SetOperatorMicrophoneVolume'] = {
			name: 'Set Operator Microphone Volume',
			options: [
				{
					id: 'volume',
					type: 'number',
					label: 'Volume (0.00 to 1.00)',
					default: 0.5,
					min: 0.00,
					max: 1.00,
					step: 0.01,
					range: true
				}
			],
			callback: async (event) => {
				this.sendCommand('SetOperatorMicrophoneVolume', event.options.volume);
			},
		}

		actions['SelectCallInQueue'] = {
			name: 'Select Call In Queue',
			options: [
				{
					type: 'dropdown',
					label: 'Call In Queue',
					id: 'queue',
					default: constants.CALL_IN_QUEUES[0].id,
					choices: constants.CALL_IN_QUEUES
				}
			],
			callback: async (event) => {
				this.sendCommand('SelectCallInQueue', event.options.queue);
			},
		}

		actions['SelectFirstGuestInCallInQueue'] = {
			name: 'Select First Guest in Call In Queue',
			options: [],
			callback: async (event) => {
				this.sendCommand('SelectFirstGuestInCallInQueue');
			},
		}

		actions['SelectNextGuestInCallInQueue'] = {
			name: 'Select Next Guest in Call In Queue',
			options: [],
			callback: async (event) => {
				this.sendCommand('SelectNextGuestInCallInQueue');
			},
		}

		actions['SelectPreviousGuestInCallInQueue'] = {
			name: 'Select Previous Guest in Call In Queue',
			options: [],
			callback: async (event) => {
				this.sendCommand('SelectPreviousGuestInCallInQueue');
			},
		}

		actions['MoveSelectedGuestInCallInQueue'] = {
			name: 'Move Selected Guest in Call In Queue',
			options: [],
			callback: async (event) => {
				this.sendCommand('MoveSelectedGuestInCallInQueue');
			},
		}
			
		this.setActionDefinitions(actions)
	}
}