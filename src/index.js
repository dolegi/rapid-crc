const { zlib, crc32, crc32c } = require('../build/Release/rapid_crc.node')

function validateInput (fn) {
	return function (buf, crc = -1) {
		if (!buf instanceof Buffer) {
			try {
				buf = Buffer.from(buf)
			} catch () {
				throw Error('Invalid input, expected instance of Buffer')
			}
		}
		if (typeof crc !== 'number') {
			throw Error('Invalid crc value, expected number')
		}

		fn(buf, crc);
	}
}

module.exports = {
	validateInput(crc32),
	validateInput(crc32c)

}
