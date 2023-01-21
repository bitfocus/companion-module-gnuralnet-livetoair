// Gnuralnet Live To Air

const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const polling = require('./src/polling')

class moduleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...polling
		})

		this.CHANNELS = [];
		this.CHANNELS_WITH_SELECTED = [];

		this.pollTimer = undefined

		this.data = {
			channels: [
				{ id: 0, label: 'Placeholder' }
			]
		}
	}

	async destroy() {
		if (this.pollTimer !== undefined) {
			clearInterval(this.pollTimer)
			delete this.pollTimer
		}

		//debug('destroy', this.id)
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.updateStatus(InstanceStatus.Connecting)

		// polling is running and polling has been de-selected by config change
		if (this.pollTimer !== undefined) {
			this.stopPolling()
		}
		this.config = config

		this.buildChannels()
		
		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.getState() //get state once, so we know the server is at least alive

		this.initPolling()
	}

	buildChannels() {
		this.CHANNELS = [];
		this.CHANNELS_WITH_SELECTED = [];

		this.CHANNELS_WITH_SELECTED.push({
			id: 0,
			label: 'Currently Selected Channel'
		});

		for (let i = 1; i <= this.config.channel_count; i++) {
			let channelObj = {
				id: i,
				label: `Channel ${i}`
			}
			this.CHANNELS.push(channelObj);
			this.CHANNELS_WITH_SELECTED.push(channelObj);
		}
	}
}

runEntrypoint(moduleInstance, UpgradeScripts)