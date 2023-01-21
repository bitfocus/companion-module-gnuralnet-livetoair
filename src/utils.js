module.exports = { 
	convertToDb(VolumeLevel) {
		let dB = (VolumeLevel * 116) - 96
		let dBString = '? dB'

		if (dB <= -96) {
			dBString = '-∞'
		}
		else {
			let multiplier = Math.pow(10, 1);
			dB = Math.round(dB * multiplier) / multiplier;
			dBString = dB.toFixed(1).toString();
		}

		return dBString + ' dB'
	}
}