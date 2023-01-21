const { combineRgb } = require('@companion-module/base')

const constants = require('./constants')

module.exports = {
	initFeedbacks() {
		let feedbacks = {}

		feedbacks['OperatorMicIsMuted'] = {
			type: 'boolean',
			name: 'Operator Mic is Muted',
			description: 'Show feedback for Operator Mic Muted State',
			options: [
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				if (this.data.operator_mic_muted == true) {
					return true
				}
				return false
			},
		}

		feedbacks['OperatorSpeakersAreMuted'] = {
			type: 'boolean',
			name: 'Operator Speakers Are Muted',
			description: 'Show feedback for Operator Speakers Muted State',
			options: [
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				if (this.data.operator_speakers_muted == true) {
					return true
				}
				return false
			},
		}

		feedbacks['PTTAllIsActive'] = {
			type: 'boolean',
			name: 'PTT All Is Active',
			description: 'Show feedback for PTT All State',
			options: [
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				if (this.data.ptt_all_active == true) {
					return true
				}
				return false
			},
		}

		feedbacks['PTTGroupIsActive'] = {
			type: 'boolean',
			name: 'PTT Group Is Active',
			description: 'Show feedback for PTT Group State',
			options: [
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				if (this.data.ptt_group_active == true) {
					return true
				}
				return false
			},
		}

		feedbacks['PTTSingleIsActive'] = {
			type: 'boolean',
			name: 'PTT Single Is Active',
			description: 'Show feedback for PTT Single State',
			options: [
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				if (this.data.ptt_single_active == true) {
					return true
				}
				return false
			},
		}

		feedbacks['GuestChannelIsOnline'] = {
			type: 'boolean',
			name: 'Guest Channel Is Online',
			description: 'Show feedback for Guest Channel Online State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options

				let channel = opt.channel;

				if (opt.channel == 0) {
					//get the actually selected user and check that
					channel = this.data.selected_channel;
				}

				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == channel);
				if (channelObj) {
					if (channelObj.online == true) {
						return true
					}
				}				
				return false
			},
		}

		feedbacks['GuestChannelIsSelected'] = {
			type: 'boolean',
			name: 'Guest Channel Is Selected',
			description: 'Show feedback for Guest Channel Selected State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS[0].id,
					choices: this.CHANNELS
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options
				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == opt.channel);
				if (channelObj) {
					if (channelObj.selected == true) {
						return true
					}
				}		
				return false
			},
		}

		feedbacks['GuestChannelIsOnAir'] = {
			type: 'boolean',
			name: 'Guest Channel Is On Air',
			description: 'Show feedback for Guest Channel On Air State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options

				let channel = opt.channel;

				if (opt.channel == 0) {
					//get the actually selected user and check that
					channel = this.data.selected_channel;
				}

				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == channel);
				if (channelObj) {
					if (channelObj.guest_state == 'OnAir') {
						return true
					}
				}
				return false
			},
		}

		feedbacks['GuestChannelInteractionState'] = {
			type: 'boolean',
			name: 'Guest Channel Interaction State is X State',
			description: 'Show feedback for Guest Channel Interaction State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS[0].id,
					choices: this.CHANNELS
				},
				{
					type: 'dropdown',
					label: 'Interaction State',
					id: 'state',
					default: constants.INTERACTION_STATES[0].id,
					choices: constants.INTERACTION_STATES
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options
				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == opt.channel);
				if (channelObj) {
					if (channelObj.interaction_state == opt.state) {
						return true
					}
				}
			},
		}

		feedbacks['GuestChannelAudioOutputMuted'] = {
			type: 'boolean',
			name: 'Guest Channel Audio Output is Muted',
			description: 'Show feedback for Guest Channel Audio Output Mute State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options

				let channel = opt.channel;

				if (opt.channel == 0) {
					//get the actually selected user and check that
					channel = this.data.selected_channel;
				}

				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == channel);
				if (channelObj) {
					if (channelObj.audiooutput_muted == true) {
						return true
					}
				}
				return false
			},
		}

		feedbacks['GuestChannelAudioReturnMuted'] = {
			type: 'boolean',
			name: 'Guest Channel Audio Return is Muted',
			description: 'Show feedback for Guest Channel Audio Return Mute State',
			options: [
				{
					type: 'dropdown',
					label: 'Channel',
					id: 'channel',
					default: this.CHANNELS_WITH_SELECTED[0].id,
					choices: this.CHANNELS_WITH_SELECTED
				}
			],
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0)
			},
			callback: (event) => {
				let opt = event.options

				let channel = opt.channel;

				if (opt.channel == 0) {
					//get the actually selected user and check that
					channel = this.data.selected_channel;
				}

				let channelObj = this.data.channels.find((CHANNEL) => CHANNEL.channel == channel);
				if (channelObj) {
					if (channelObj.audioreturn_muted == true) {
						return true
					}
				}
				return false
			},
		}

		this.setFeedbackDefinitions(feedbacks)
	}
}