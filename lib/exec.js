const child_process = require('child_process');

module.exports = (command, options) => new Promise(
	(resolve, reject) => {
		try {
			const result = child_process.execSync(
				command,
				Object.assign({ stdio: ['pipe', 'pipe', process.stderr] }, options)
			);

			resolve(result.toString());
		} catch (error) {
			reject(error);
		}
	}
);
