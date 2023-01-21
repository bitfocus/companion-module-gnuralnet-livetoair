const axios = require('axios')

class API {
	constructor(config) {
		const apiHost = config.host
		const apiPort = config.port

		this.baseUrl = `http://${apiHost}:${apiPort}/`
	}

	async sendRequest(cmd) {
		let requestUrl = this.baseUrl + cmd;
		
		try {
			const response = await axios.get(requestUrl)
			
			if (response.status !== 200) {
				return {
					status: 'failed',
				}
			}
			return {
				status: 'success',
				response: response,
			}
		} catch (err) {
			return {
				status: 'failed',
			}
		}
	}
}

module.exports = API;