import stylelint from 'stylelint';

export const ruleName = '{{ruleName}}';

export default stylelint.createPlugin(ruleName, (action, opts, context) => {
	const shouldFix = is(context, 'fix', true);

	return async (root, result) => {
		// validate the action
		const isActionValid = stylelint.utils.validateOptions(result, ruleName, {
			actual: action,
			possible() {
				return is(action, ['always', 'never', 'ignore', true, false, null]);
			}
		});

		if (isActionValid) {
			if (is(action, ['always', true])) {
				if (shouldFix) {
					stylelint.utils.report({
						message: messages.unexpected('foo', 'bar'),
						node: root,
						result,
						ruleName,
					});
				} else {
					// fix
				}
			}
		}
	};
});

export const messages = stylelint.utils.ruleMessages(ruleName, {
	unexpected: (name, node) => `Unexpected "${name}" inside "${node}".`,
});

const is = (value, ...keys) => {
	const length = keys.length;
	const matches = keys.pop();
	const subvalue = keys.reduce((result, key) => Object(result)[key], value);

	return length ?
		[].concat(matches).some(
			match => match instanceof RegExp
				? match.test(subvalue)
			: match === subvalue
		)
	: Boolean(value);
};
