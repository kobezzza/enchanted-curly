const
	{RuleTester} = require('eslint');

const
	{rules} = require('../lib');

const parser = {
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module'
	}
}

Object.keys(rules).forEach((name) => {
	require(`./lib/rules/${name}`)({rule: rules[name], ruleTester: new RuleTester(parser)});
});
