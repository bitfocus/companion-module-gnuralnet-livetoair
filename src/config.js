const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to a Live To Air server.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Server',
				width: 6,
				default: '192.168.0.1',
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 6,
				default: 56000,
				regex: Regex.PORT
			},
			{
				type: 'dropdown',
				label: 'Channels',
				id: 'channel_count',
				default: 12,
				choices: [
					{ id: 6, label: '6 Channels' },
					{ id: 12, label: '12 Channels' }
				],
				width: 12
			},
			{
				type: 'number',
				id: 'poll_interval',
				label: 'Polling Interval (ms), set to 0 to disable polling',
				min: 50,
				max: 30000,
				default: 1000,
				width: 3,
			},
			{
				type: 'static-text',
				id: 'dummy2',
				width: 12,
				label: ' ',
				value: ' ',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false
			}
		]
	}
}