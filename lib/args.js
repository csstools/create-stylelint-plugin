const path = require('path');

// match double-dash arguments
const dash = /^--([^\s]+)$/;

// export object from double-dash arguments
const args = process.argv.slice(2).reduce(
	(object, arg, i, args) => {
		if (dash.test(arg)) {
			object[arg.replace(dash, '$1')] = args[i + 1];
		} else if (!dash.test(args[i - 1]) && !object.to) {
			object.to = arg;
		}

		return object;
	},
	{}
);

module.exports = key => key in args ? Promise.resolve(args[key]) : Promise.reject();
