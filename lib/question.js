// tooling
const readline = require('readline');

const dim = string => `\x1b[2m${string}\x1b[0m`;

let readlineInterface;

// then-ified readline question
const question = module.exports = prompt => new Promise(
	(resolve, reject) => question.open().question(dim(`${prompt}: `),
		answer => answer ? resolve(answer) : reject()
	)
);

// interface opener
question.open = () => readlineInterface = readlineInterface || readline.createInterface({
	input:  process.stdin,
	output: process.stdout
});

// interface closer
question.close = () => {
	if (question.interface) {
		question.interface.close();
	}
};
