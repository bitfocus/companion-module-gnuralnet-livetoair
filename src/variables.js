const { InstanceStatus } = require('@companion-module/base')

const utils = require('./utils')

module.exports = {
	initVariables() {
		let variables = []

		variables.push({ variableId: 'selected_channel', name: 'Selected Channel' })
		variables.push({ variableId: 'operator_mic_level', name: 'Operator Mic Level' })
		variables.push({ variableId: 'operator_mic_muted', name: 'Operator Mic Mute State' })
		variables.push({ variableId: 'operator_speakers_level', name: 'Operator Speakers Level' })
		variables.push({ variableId: 'operator_speakers_muted', name: 'Operator Speakers Mute State' })
		variables.push({ variableId: 'ptt_all_active', name: 'PTT All Is Active' })
		variables.push({ variableId: 'ptt_group_active', name: 'PTT Group Is Active' })
		variables.push({ variableId: 'ptt_single_active', name: 'PTT Single Is Active' })
		variables.push({ variableId: 'callinqueue_selected', name: 'Selected Call In Queue' })
		variables.push({ variableId: 'callinqueue_guest_name', name: 'Call In Queue Guest Name' })
		variables.push({ variableId: 'callinqueue_guest_isonline', name: 'Call In Queue Guest Is Online' })

		for (let i = 1; i <= this.config.channel_count; i++) {
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_name`, name: `Guest ${i} Name` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_notes`, name: `Guest ${i} Notes` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_group`, name: `Guest ${i} Group` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_online`, name: `Guest ${i} Online State` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_selected`, name: `Guest ${i} Is Selected` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_guest_state`, name: `Guest ${i} State` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_interaction_state`, name: `Guest ${i} Interaction State` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_audiooutput_level`, name: `Guest ${i} Audio Output Level` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_audiooutput_muted`, name: `Guest ${i} Audio Output Mute Status` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_audioreturn_level`, name: `Guest ${i} Audio Return Level` })
			variables.push({ variableId: `guest_${i.toString().padStart(2,'0')}_audioreturn_muted`, name: `Guest ${i} Audio Return Mute Status` })
		}

		this.setVariableDefinitions(variables)

		let channelVars = {}

		channelVars.selected_channel = ''
		channelVars.operator_mic_level = ''
		channelVars.operator_mic_muted = ''
		channelVars.operator_speaker_level = ''
		channelVars.operator_speaker_muted = ''
		channelVars.ptt_all_active = ''
		channelVars.ptt_group_active = ''
		channelVars.ptt_single_active = ''		
		channelVars.callinqueue_selected = ''
		channelVars.callinqueue_guest_name = ''
		channelVars.callinqueue_guest_isonline = ''

		for (let i = 1; i <= this.config.channel_count; i++) {
			channelVars[`guest_${i.toString().padStart(2,'0')}_name`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_notes`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_group`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_online`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_selected`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_guest_state`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_interaction_state`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_audiooutput_level`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_audiooutput_muted`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_audioreturn_level`] = ''
			channelVars[`guest_${i.toString().padStart(2,'0')}_audioreturn_muted`] = ''
		}

		this.setVariableValues(channelVars)
	},

	checkVariables() {
		try {
			let channelVars = {}
		
			channelVars.selected_channel = this.data.selected_channel
			channelVars.operator_mic_level = utils.convertToDb(this.data.operator_mic_level)
			channelVars.operator_mic_muted = this.data.operator_mic_muted == true ? 'Muted' : 'Unmuted'
			channelVars.operator_speakers_level = utils.convertToDb(this.data.operator_speakers_level)
			channelVars.operator_speakers_muted = this.data.operator_speakers_muted == true ? 'Muted' : 'Unmuted'
			channelVars.ptt_all_active = this.data.ptt_all_active == true ? 'True' : 'False'
			channelVars.ptt_group_active = this.data.ptt_group_active == true ? 'True' : 'False'
			channelVars.ptt_single_active = this.data.ptt_single_active == true ? 'True' : 'False'		
			channelVars.callinqueue_selected = this.data.callinqueue_selected
			channelVars.callinqueue_guest_name = this.data.callinqueue_guest_name
			channelVars.callinqueue_guest_isonline = this.data.callinqueue_guest_isonline == true ? 'True' : 'False'

			for (let i = 0; i < this.data.channels.length; i++) {
				let channelNumber = this.data.channels[i].channel.toString().padStart(2,'0')
				channelVars[`guest_${channelNumber}_name`] = this.data.channels[i].name
				channelVars[`guest_${channelNumber}_notes`] = this.data.channels[i].notes
				channelVars[`guest_${channelNumber}_group`] = this.data.channels[i].group
				channelVars[`guest_${channelNumber}_online`] = this.data.channels[i].online == true ? 'True' : 'False'
				channelVars[`guest_${channelNumber}_selected`] = this.data.channels[i].selected == true ? 'True' : 'False'
				channelVars[`guest_${channelNumber}_guest_state`] = this.data.channels[i].guest_state
				channelVars[`guest_${channelNumber}_interaction_state`] = this.data.channels[i].interaction_state
				channelVars[`guest_${channelNumber}_audiooutput_level`] = utils.convertToDb(this.data.channels[i].audiooutput_level)
				channelVars[`guest_${channelNumber}_audiooutput_muted`] = this.data.channels[i].audiooutput_muted == true ? 'Muted' : 'Unmuted'
				channelVars[`guest_${channelNumber}_audioreturn_level`] = utils.convertToDb(this.data.channels[i].audioreturn_level)
				channelVars[`guest_${channelNumber}_audioreturn_muted`] = this.data.channels[i].audioreturn_muted == true ? 'Muted' : 'Unmuted'
			}

			this.setVariableValues(channelVars)
		}
		catch(error) {
			this.updateStatus(InstanceStatus.UnknownWarning)
			this.log('error',  `Error checking variables: ${error.toString()}`);
		}
	}
}