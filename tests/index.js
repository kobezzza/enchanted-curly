const
	{RuleTester} = require('eslint');

const
	{rules} = require('../lib');

const parser = {
	parser: require.resolve('babel-eslint'),
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module'
	}
}

Object.keys(rules).forEach((name) => {
	require(`./lib/rules/${name}`)({rule: rules[name], ruleTester: new RuleTester(parser)});
});
