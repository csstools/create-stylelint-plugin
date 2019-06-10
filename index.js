#!/usr/bin/env node

// tooling
const args     = require('./lib/args');
const exec     = require('./lib/exec');
const fs       = require('./lib/fs');
const gitinfo  = require('./lib/gitinfo');
const path     = require('path');
const question = require('./lib/question');

// caching
const answers = {};

// capturing
const keys = /\{\{([^\}]+)\}\}/g;

// directory names
const tpl = 'template';

// directory paths
const __tpl = path.join(__dirname, tpl);
const __out = process.cwd();

const patchPkg = ',\n    ".*",\n    "*"';

const successMessage = answers => `Success! Created ${answers.title} at ${answers.to}

We suggest that you begin by typing:

  cd ${path.relative(process.cwd(), answers.to)}
  npm start

Happy stylelinting!`;

// capture answers
(questions => Object.keys(questions).reduce(
	(resolver, key) => resolver.then(
		() => questions[key]()
	).then(
		answer => answers[key] = answer
	),
	Promise.resolve()
).then(
	() => answers
))({
	// --date, or formatted date
	date: () => args('date').catch(
		() => new Date(Date.now()).toLocaleDateString('en-US', {
			weekday: 'narrow',
			year:    'numeric',
			month:   'long',
			day:     'numeric'
		}).slice(3)
	),

	// --title, prompt, or Example
	title: () => args('title').catch(
		() => question('Plugin Name')
	).catch(
		() => 'Example'
	).then(
		title => title
		.trim()
		.replace(/^(stylelint\s+)?/i, 'Stylelint ')
	),

	// --id, or formatted title
	id: () => args('id').catch(
		() => answers.title
	).then(
		// trim spaces, replace non-word groups with dashes, trim trailing dashes
		answer => answer
		.trim()
		.replace(/[^\w]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase()
	),

	// --id-camel, or formatted title
	idCamelCase: () => args('id-camel').catch(
		() => answers.title
	).then(
		// trim spaces, replace non-word groups with dashes, trim trailing dashes, replace dash letter with uppercase letter
		answer => `stylelint${answer
		.trim()
		.replace(/^(stylelint\s+)?/i, '')
		.replace(/[^\w]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/(^|-)\w/g, match => match.replace(/^-/, '').toUpperCase())}`
	),

	// --author, gitinfo name, prompt, or Stylelint Community
	author: () => args('author').catch(
		() => gitinfo('name')
	).catch(
		() => question('GitHub author')
	).catch(
		() => 'Stylelint Community'
	),

	// --email, gitinfo email, prompt, or stylelint@stylelint.io
	email: () => args('email').catch(
		() => gitinfo('email')
	).catch(
		() => question('GitHub email')
	).catch(
		() => 'stylelint@stylelint.io'
	),

	// --email, gitinfo user, prompt, or stylelint
	user: () => args('user').catch(
		() => gitinfo('user')
	).catch(
		() => question('GitHub user')
	).catch(
		() => 'stylelint'
	),

	// --rule, or rule name
	ruleName: () => args('rule').catch(
		() => answers.title
	).then(
		// trim spaces, replace non-word groups with dashes, trim trailing dashes, replace dash letter with uppercase letter
		answer => `${answers.user}/${answer
		.trim()
		.replace(/^stylelint\s+/i, '')
		.replace(/[^\w]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase()}`
	),

	// --keywords, or prompt, and then formatted
	keywords: () => args('keywords').catch(
		() => question('Keywords')
	).catch(
		() => ''
	).then(
		keywords => ['stylelint', 'stylelint-plugin', 'css'].concat(
			keywords
			.trim()
			.split(/\s*,\s*/)
		).join('",\n    "')
	),

	// --to, or deault
	to: () => args('to').catch(
		() => __out
	).then(
		dir => path.resolve(dir)
	)
}).then(
	// read template files, update their contents with answers, and write them to the destination
	answers => fs.readdir(__tpl).then(
		files => Promise.all(files.map(
			file => fs.readFile(path.join(__tpl, file), 'utf8').then(
				content => content.replace(
					keys,
					(match, key) => key in answers ? answers[key] : match
				).replace(patchPkg, '')
			).then(
				content => fs.writeFile(path.join(answers.to, file.replace(/-template$/, '')), content)
			)
		))
	).then(
		() => Promise.all([
			fs.rmdir(path.resolve(answers.to, '.git')).catch(() => {}).then(
				() => exec(
					'git init',
					{
						cwd: answers.to
					}
				)
			).then(
				() => exec(
					`git remote add origin git@github.com:${answers.user}/${answers.id}.git`,
					{
						cwd: answers.to
					}
				)
			),
			exec(
				`npm install`,
				{
					cwd: answers.to
				}
			),
			fs.rmdir(path.resolve(answers.to, 'lib')).catch(() => {})
		])
	).then(
		() => answers
	)
).then(
	answers => {
		console.log(successMessage(answers));
		process.exit(0);
	},
	error => {
		console.warn(error);
		process.exit(1);
	}
);
