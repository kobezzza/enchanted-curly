module.exports = ({rule, ruleTester}) => {
	ruleTester.run('object-curly-spacing', rule, {
		valid: [
			{
				code: `
					import {foo} from 'bar';
					export {foo};
					const bla = {a: 1, b: 2};
				`,

				options: ['never']
			},

			{
				code: `
					import { foo } from 'bar';
					export { foo };
					const bla = { a: 1, b: 2 };
				`,

				options: ['always']
			},

			{
				code: "import { foo } from 'bar';",
				options: ['never', {import: true}]
			},

			{
				code: "import {foo} from 'bar';",
				options: ['always', {import: false}]
			},

			{
				code: `
					const foo = 1;
					export { foo };
					export { bla } from 'foo';
				`,

				options: ['never', {export: true}]
			},

			{
				code: `
					const foo = 1;
					export {foo};
					export {bla} from 'foo';

					const a = { a: 1 };
				`,

				options: ['always', {export: false}]
			},

			{
				code: `
import {

	foo,
	bla

} from 'bar';

const bar = {
	a: 1,
	b: 2
};`,

				options: ['never', {import: true, multiline: true}]
			},

			{
				code: `
import {
	foo,
	bla
} from 'bar';

import {foo2, bla2} from 'bar2';

const bar = {

	a: 1,
	b: 2

};

const bar2 = { a: 1, b: 2 };
`,

				options: ['always', {import: false, multiline: true}]
			},

			// 3-rd party tests

			// always - object literals
			{code: 'var obj = { foo: bar, baz: qux };', options: ['always']},
			{code: 'var obj = { foo: { bar: quxx }, baz: qux };', options: ['always']},
			{code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['always']},
			{code: 'var obj = { /**/foo:bar/**/ };', options: ['always']},
			{code: 'var obj = { //\nfoo:bar };', options: ['always']},

			// always - destructuring
			{code: 'var { x } = y', options: ['always']},
			{code: 'var { x, y } = y', options: ['always']},
			{code: 'var { x,y } = y', options: ['always']},
			{code: 'var {\nx,y } = y', options: ['always']},
			{code: 'var {\nx,y\n} = z', options: ['always']},
			{code: 'var { /**/x/**/ } = y', options: ['always']},
			{code: 'var { //\nx } = y', options: ['always']},
			{code: 'var { x = 10, y } = y', options: ['always']},
			{code: 'var { x: { z }, y } = y', options: ['always']},
			{code: 'var {\ny,\n} = x', options: ['always']},
			{code: 'var { y, } = x', options: ['always']},
			{code: 'var { y: x } = x', options: ['always']},

			// always - import / export
			{code: "import door from 'room'", options: ['always']},
			{
				code: "import * as door from 'room'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "import { door } from 'room'", options: ['always']},
			{
				code: "import {\ndoor } from 'room'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import { /**/door/**/ } from 'room'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import { //\ndoor } from 'room'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "export { door } from 'room'", options: ['always']},
			{
				code: "import { house, mouse } from 'caravan'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import house, { mouse } from 'caravan'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import door, { house, mouse } from 'caravan'",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: 'var door = 0;export { door }',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "import 'room'", options: ['always']},
			{
				code: "import { bar as x } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "import { x, } from 'foo';", options: ['always']},
			{code: "import {\nx,\n} from 'foo';", options: ['always']},
			{code: "export { x, } from 'foo';", options: ['always']},
			{code: "export {\nx,\n} from 'foo';", options: ['always']},
			{
				code: "export { /**/x/**/ } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "export { //\nx } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: 'var x = 1;\nexport { /**/x/**/ };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: 'var x = 1;\nexport { //\nx };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},

			// always - empty object
			{code: 'var foo = {};', options: ['always']},

			// always - objectsInObjects
			{code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};", options: ['always', {objectsInObjects: false}]},
			{code: 'var a = { noop: function () {} };', options: ['always', {objectsInObjects: false}]},
			{code: 'var { y: { z }} = x', options: ['always', {objectsInObjects: false}]},

			// always - arraysInObjects
			{code: "var obj = { 'foo': [ 1, 2 ]};", options: ['always', {arraysInObjects: false}]},
			{code: 'var a = { thingInList: list[0] };', options: ['always', {arraysInObjects: false}]},

			// always - arraysInObjects, objectsInObjects
			{
				code: "var obj = { 'qux': [ 1, 2 ], 'foo': { 'bar': 1, 'baz': 2 }};",
				options: ['always', {arraysInObjects: false, objectsInObjects: false}]
			},

			// always - arraysInObjects, objectsInObjects (reverse)
			{
				code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }, 'qux': [ 1, 2 ]};",
				options: ['always', {arraysInObjects: false, objectsInObjects: false}]
			},

			// never
			{code: 'var obj = {foo: bar,\nbaz: qux\n};', options: ['never']},
			{code: 'var obj = {\nfoo: bar,\nbaz: qux};', options: ['never']},

			// never - object literals
			{code: 'var obj = {foo: bar, baz: qux};', options: ['never']},
			{code: 'var obj = {foo: {bar: quxx}, baz: qux};', options: ['never']},
			{code: 'var obj = {foo: {\nbar: quxx}, baz: qux\n};', options: ['never']},
			{code: 'var obj = {foo: {\nbar: quxx\n}, baz: qux};', options: ['never']},
			{code: 'var obj = {\nfoo: bar,\nbaz: qux\n};', options: ['never']},
			{code: 'var obj = {foo: bar, baz: qux /* */};', options: ['never']},
			{code: 'var obj = {/* */ foo: bar, baz: qux};', options: ['never']},
			{code: 'var obj = {//\n foo: bar};', options: ['never']},
			{code: 'var obj = { // line comment exception\n foo: bar};', options: ['never']},

			// never - destructuring
			{code: 'var {x} = y', options: ['never']},
			{code: 'var {x, y} = y', options: ['never']},
			{code: 'var {x,y} = y', options: ['never']},
			{code: 'var {\nx,y\n} = y', options: ['never']},
			{code: 'var {x = 10} = y', options: ['never']},
			{code: 'var {x = 10, y} = y', options: ['never']},
			{code: 'var {x: {z}, y} = y', options: ['never']},
			{code: 'var {\nx: {z\n}, y} = y', options: ['never']},
			{code: 'var {\ny,\n} = x', options: ['never']},
			{code: 'var {y,} = x', options: ['never']},
			{code: 'var {y:x} = x', options: ['never']},
			{code: 'var {/* */ y} = x', options: ['never']},
			{code: 'var {y /* */} = x', options: ['never']},
			{code: 'var {//\n y} = x', options: ['never']},
			{code: 'var { // line comment exception\n y} = x', options: ['never']},

			// never - import / export
			{code: "import door from 'room'", options: ['never']},
			{code: "import * as door from 'room'", options: ['never']},
			{code: "import {door} from 'room'", options: ['never']},
			{code: "export {door} from 'room'", options: ['never']},
			{
				code: "import {/* */ door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "export {/* */ door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import {door /* */} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "export {door /* */} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import {//\n door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "export {//\n door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: 'var door = foo;\nexport {//\n door}',
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import { // line comment exception\n door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "export { // line comment exception\n door} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: 'var door = foo; export { // line comment exception\n door}',
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "import {\ndoor} from 'room'", options: ['never']},
			{
				code: "export {\ndoor\n} from 'room'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import {house,mouse} from 'caravan'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import {house, mouse} from 'caravan'",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: 'var door = 0;export {door}', options: ['never']},
			{code: "import 'room'", options: ['never']},
			{code: "import x, {bar} from 'foo';", options: ['never']},
			{
				code: "import x, {bar, baz} from 'foo';",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{
				code: "import {bar as y} from 'foo';",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'}
			},
			{code: "import {x,} from 'foo';", options: ['never']},
			{code: "import {\nx,\n} from 'foo';", options: ['never']},
			{code: "export {x,} from 'foo';", options: ['never']},
			{code: "export {\nx,\n} from 'foo';", options: ['never']},

			// never - empty object
			{code: 'var foo = {};', options: ['never']},

			// never - objectsInObjects
			{code: "var obj = {'foo': {'bar': 1, 'baz': 2} };", options: ['never', {objectsInObjects: true}]},

			/*
			 * https://github.com/eslint/eslint/issues/3658
			 * Empty cases.
			 */
			{code: 'var {} = foo;'},
			{code: 'var [] = foo;'},
			{code: 'var {a: {}} = foo;'},
			{code: 'var {a: []} = foo;'},
			{code: "import {} from 'foo';"},
			{code: "export {} from 'foo';"},
			{code: 'export {};'},
			{code: 'var {} = foo;', options: ['never']},
			{code: 'var [] = foo;', options: ['never']},
			{code: 'var {a: {}} = foo;', options: ['never']},
			{code: 'var {a: []} = foo;', options: ['never']},
			{code: "import {} from 'foo';", options: ['never']},
			{code: "export {} from 'foo';", options: ['never']},
			{code: 'export {};', options: ['never']}
		],

		invalid: [
			{
				code: "import {foo} from 'bar';",

				errors: [
					{
						message: "A space is required after '{'.",
						column: 'import {'.length
					},

					{
						message: "A space is required before '}'.",
						column: 'import {foo}'.length
					}
				],

				output: "import { foo } from 'bar';",
				options: ['never', {import: true}]
			},

			{
				code: `
import {
	foo,
	bla
} from 'bar';

const bar = {

	a: 1,
	b: 2

};`,

				errors: [
					{
						message: "A line break is required after '{'."
					},

					{
						message: "A line break is required before '}'."
					},

					{
						message: "There should be no line break after '{'."
					},

					{
						message: "There should be no line break before '}'."
					}
				],

				output: `
import {

	foo,
	bla

} from 'bar';

const bar = {
	a: 1,
	b: 2
};`,

				options: ['never', {import: true, multiline: true}]
			},

			{
				code: `
import {

	foo,
	bla

} from 'bar';

import { foo2, bla2 } from 'bar2';

const bar = {
	a: 1,
	b: 2
};

const bar2 = {a: 1, b: 2};
`,

				errors: [
					{
						message: "There should be no line break after '{'."
					},

					{
						message: "There should be no line break before '}'."
					},

					{
						message: "There should be no space after '{'."
					},

					{
						message: "There should be no space before '}'."
					},

					{
						message: "A line break is required after '{'."
					},

					{
						message: "A line break is required before '}'."
					},

					{
						message: "A space is required after '{'."
					},

					{
						message: "A space is required before '}'."
					}
				],

				output: `
import {
	foo,
	bla
} from 'bar';

import {foo2, bla2} from 'bar2';

const bar = {

	a: 1,
	b: 2

};

const bar2 = { a: 1, b: 2 };
`,

				options: ['always', {import: false, multiline: true}]
			},

			{
				code: `
import {

	foo,
	bla

} from 'bar';`,

				errors: [
					{
						message: "There should be no line break after '{'."
					},

					{
						message: "There should be no line break before '}'."
					}
				],

				output: `
import {
	foo,
	bla
} from 'bar';`,

				options: ['never', {import: true}]
			},

			{
				code: "export {foo} from 'bar';",

				errors: [
					{
						message: "A space is required after '{'.",
						column: 'export {'.length
					},

					{
						message: "A space is required before '}'.",
						column: 'export {foo}'.length
					}
				],

				output: "export { foo } from 'bar';",
				options: ['never', {export: true}]
			},

			{
				code: `
export {
	foo,
	bla
} from 'bar';`,

				errors: [
					{
						message: "A line break is required after '{'."
					},

					{
						message: "A line break is required before '}'."
					}
				],

				output: `
export {

	foo,
	bla

} from 'bar';`,

				options: ['never', {export: true, multiline: true}]
			},

			{
				code: `
export {

	foo,
	bla

} from 'bar';`,

				errors: [
					{
						message: "There should be no line break after '{'."
					},

					{
						message: "There should be no line break before '}'."
					}
				],

				output: `
export {
	foo,
	bla
} from 'bar';`,

				options: ['never', {export: true}]
			},

			// 3-rd party tests

			{
				code: "import {bar} from 'foo.js';",
				output: "import { bar } from 'foo.js';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 8,
						endLine: 1,
						endColumn: 9
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 13
					}
				]
			},
			{
				code: "import { bar as y} from 'foo.js';",
				output: "import { bar as y } from 'foo.js';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 18,
						endLine: 1,
						endColumn: 19
					}
				]
			},
			{
				code: "import {bar as y} from 'foo.js';",
				output: "import { bar as y } from 'foo.js';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 8,
						endLine: 1,
						endColumn: 9
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 17,
						endLine: 1,
						endColumn: 18
					}
				]
			},
			{
				code: "import { bar} from 'foo.js';",
				output: "import { bar } from 'foo.js';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 13,
						endLine: 1,
						endColumn: 14
					}
				]
			},
			{
				code: "import x, { bar} from 'foo';",
				output: "import x, { bar } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 16,
						endLine: 1,
						endColumn: 17
					}

				]
			},
			{
				code: "import x, { bar/* */} from 'foo';",
				output: "import x, { bar/* */ } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 21,
						endLine: 1,
						endColumn: 22
					}
				]
			},
			{
				code: "import x, {/* */bar } from 'foo';",
				output: "import x, { /* */bar } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: "import x, {//\n bar } from 'foo';",
				output: "import x, { //\n bar } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: "import x, { bar, baz} from 'foo';",
				output: "import x, { bar, baz } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 21,
						endLine: 1,
						endColumn: 22
					}

				]
			},
			{
				code: "import x, {bar} from 'foo';",
				output: "import x, { bar } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 15,
						endLine: 1,
						endColumn: 16
					}

				]
			},
			{
				code: "import x, {bar, baz} from 'foo';",
				output: "import x, { bar, baz } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 20,
						endLine: 1,
						endColumn: 21
					}
				]
			},
			{
				code: "import {bar,} from 'foo';",
				output: "import { bar, } from 'foo';",
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 8,
						endLine: 1,
						endColumn: 9
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 13,
						endLine: 1,
						endColumn: 14
					}

				]
			},
			{
				code: "import { bar, } from 'foo';",
				output: "import {bar,} from 'foo';",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 9,
						endLine: 1,
						endColumn: 10
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 14,
						endLine: 1,
						endColumn: 15
					}
				]
			},
			{
				code: "import { /* */ bar, /* */ } from 'foo';",
				output: "import {/* */ bar, /* */} from 'foo';",
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ImportDeclaration',
						line: 1,
						column: 9,
						endLine: 1,
						endColumn: 10
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ImportDeclaration',
						line: 1,
						column: 26,
						endLine: 1,
						endColumn: 27
					}
				]
			},
			{
				code: 'var bar = 0;\nexport {bar};',
				output: 'var bar = 0;\nexport { bar };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 8,
						endLine: 2,
						endColumn: 9
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 12
					}
				]
			},
			{
				code: 'var bar = 0;\nexport {/* */ bar /* */};',
				output: 'var bar = 0;\nexport { /* */ bar /* */ };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 8,
						endLine: 2,
						endColumn: 9
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 24,
						endLine: 2,
						endColumn: 25
					}
				]
			},
			{
				code: 'var bar = 0;\nexport {//\n bar };',
				output: 'var bar = 0;\nexport { //\n bar };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 8,
						endLine: 2,
						endColumn: 9
					}
				]
			},
			{
				code: 'var bar = 0;\nexport { /* */ bar /* */ };',
				output: 'var bar = 0;\nexport {/* */ bar /* */};',
				options: ['never'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 9,
						endLine: 2,
						endColumn: 10
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ExportNamedDeclaration',
						line: 2,
						column: 25,
						endLine: 2,
						endColumn: 26
					}
				]
			},

			// always - arraysInObjects
			{
				code: "var obj = { 'foo': [ 1, 2 ] };",
				output: "var obj = { 'foo': [ 1, 2 ]};",
				options: ['always', {arraysInObjects: false}],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 28,
						endLine: 1,
						endColumn: 29
					}
				]
			},
			{
				code: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ] };",
				output: "var obj = { 'foo': [ 1, 2 ] , 'bar': [ 'baz', 'qux' ]};",
				options: ['always', {arraysInObjects: false}],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 54,
						endLine: 1,
						endColumn: 55
					}
				]
			},

			// always-objectsInObjects
			{
				code: "var obj = { 'foo': { 'bar': 1, 'baz': 2 } };",
				output: "var obj = { 'foo': { 'bar': 1, 'baz': 2 }};",
				options: ['always', {objectsInObjects: false}],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 42,
						endLine: 1,
						endColumn: 43
					}
				]
			},
			{
				code: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 } };",
				output: "var obj = { 'foo': [ 1, 2 ] , 'bar': { 'baz': 1, 'qux': 2 }};",
				options: ['always', {objectsInObjects: false}],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 60,
						endLine: 1,
						endColumn: 61
					}
				]
			},

			// always-destructuring trailing comma
			{
				code: 'var { a,} = x;',
				output: 'var { a, } = x;',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 9,
						endLine: 1,
						endColumn: 10
					}
				]
			},
			{
				code: 'var {a, } = x;',
				output: 'var {a,} = x;',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 8,
						endLine: 1,
						endColumn: 9
					}
				]
			},
			{
				code: 'var {a:b } = x;',
				output: 'var {a:b} = x;',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 9,
						endLine: 1,
						endColumn: 10
					}
				]
			},
			{
				code: 'var { a:b } = x;',
				output: 'var {a:b} = x;',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 6,
						endLine: 1,
						endColumn: 7
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 10,
						endLine: 1,
						endColumn: 11
					}
				]
			},
			{
				code: 'var {  a:b  } = x;',
				output: 'var {a:b} = x;',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 6,
						endLine: 1,
						endColumn: 8
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 13
					}
				]
			},
			{
				code: 'var {   a:b    } = x;',
				output: 'var {a:b} = x;',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 6,
						endLine: 1,
						endColumn: 9
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 16
					}
				]
			},

			// never-objectsInObjects
			{
				code: "var obj = {'foo': {'bar': 1, 'baz': 2}};",
				output: "var obj = {'foo': {'bar': 1, 'baz': 2} };",
				options: ['never', {objectsInObjects: true}],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 39,
						endLine: 1,
						endColumn: 40
					}
				]
			},
			{
				code: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2}};",
				output: "var obj = {'foo': [1, 2] , 'bar': {'baz': 1, 'qux': 2} };",
				options: ['never', {objectsInObjects: true}],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 55,
						endLine: 1,
						endColumn: 56
					}
				]
			},

			// always & never
			{
				code: 'var obj = {foo: bar, baz: qux};',
				output: 'var obj = { foo: bar, baz: qux };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 30,
						endLine: 1,
						endColumn: 31
					}
				]
			},
			{
				code: 'var obj = {foo: bar, baz: qux };',
				output: 'var obj = { foo: bar, baz: qux };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var obj = {/* */foo: bar, baz: qux };',
				output: 'var obj = { /* */foo: bar, baz: qux };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var obj = {//\n foo: bar };',
				output: 'var obj = { //\n foo: bar };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var obj = { foo: bar, baz: qux};',
				output: 'var obj = { foo: bar, baz: qux };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 31,
						endLine: 1,
						endColumn: 32
					}
				]
			},
			{
				code: 'var obj = { foo: bar, baz: qux/* */};',
				output: 'var obj = { foo: bar, baz: qux/* */ };',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 36,
						endLine: 1,
						endColumn: 37
					}
				]
			},
			{
				code: 'var obj = { foo: bar, baz: qux };',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 13
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 31,
						endLine: 1,
						endColumn: 32
					}
				]
			},
			{
				code: 'var obj = {  foo: bar, baz: qux };',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 14
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 32,
						endLine: 1,
						endColumn: 33
					}
				]
			},
			{
				code: 'var obj = {foo: bar, baz: qux };',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 30,
						endLine: 1,
						endColumn: 31
					}
				]
			},
			{
				code: 'var obj = {foo: bar, baz: qux  };',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 30,
						endLine: 1,
						endColumn: 32
					}
				]
			},
			{
				code: 'var obj = {foo: bar, baz: qux /* */ };',
				output: 'var obj = {foo: bar, baz: qux /* */};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 36,
						endLine: 1,
						endColumn: 37
					}
				]
			},
			{
				code: 'var obj = { foo: bar, baz: qux};',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 13
					}
				]
			},
			{
				code: 'var obj = {  foo: bar, baz: qux};',
				output: 'var obj = {foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 14
					}
				]
			},
			{
				code: 'var obj = { /* */ foo: bar, baz: qux};',
				output: 'var obj = {/* */ foo: bar, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 13
					}
				]
			},
			{
				code: 'var obj = { // line comment exception\n foo: bar };',
				output: 'var obj = { // line comment exception\n foo: bar};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 2,
						column: 10,
						endLine: 2,
						endColumn: 11
					}
				]
			},
			{
				code: 'var obj = { foo: { bar: quxx}, baz: qux};',
				output: 'var obj = {foo: {bar: quxx}, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 12,
						endLine: 1,
						endColumn: 13
					},
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 19,
						endLine: 1,
						endColumn: 20
					}
				]
			},
			{
				code: 'var obj = {foo: {bar: quxx }, baz: qux };',
				output: 'var obj = {foo: {bar: quxx}, baz: qux};',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 27,
						endLine: 1,
						endColumn: 28
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 39,
						endLine: 1,
						endColumn: 40
					}
				]
			},
			{
				code: 'export const thing = {value: 1 };',
				output: 'export const thing = { value: 1 };',
				options: ['always'],
				parserOptions: {ecmaVersion: 6, sourceType: 'module'},
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectExpression',
						line: 1,
						column: 22,
						endLine: 1,
						endColumn: 23
					}
				]
			},

			// destructuring
			{
				code: 'var {x, y} = y',
				output: 'var { x, y } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 5,
						endLine: 1,
						endColumn: 6
					},
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 10,
						endLine: 1,
						endColumn: 11
					}
				]
			},
			{
				code: 'var { x, y} = y',
				output: 'var { x, y } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var { x, y/* */} = y',
				output: 'var { x, y/* */ } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 16,
						endLine: 1,
						endColumn: 17
					}
				]
			},
			{
				code: 'var {/* */x, y } = y',
				output: 'var { /* */x, y } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 5,
						endLine: 1,
						endColumn: 6
					}
				]
			},
			{
				code: 'var {//\n x } = y',
				output: 'var { //\n x } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 5,
						endLine: 1,
						endColumn: 6
					}
				]
			},
			{
				code: 'var { x, y } = y',
				output: 'var {x, y} = y',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 6,
						endLine: 1,
						endColumn: 7
					},
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var {x, y } = y',
				output: 'var {x, y} = y',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 10,
						endLine: 1,
						endColumn: 11
					}
				]
			},
			{
				code: 'var {x, y/* */ } = y',
				output: 'var {x, y/* */} = y',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 15,
						endLine: 1,
						endColumn: 16
					}
				]
			},
			{
				code: 'var { /* */x, y} = y',
				output: 'var {/* */x, y} = y',
				options: ['never'],
				errors: [
					{
						messageId: 'unexpectedSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 6,
						endLine: 1,
						endColumn: 7
					}
				]
			},
			{
				code: 'var { x=10} = y',
				output: 'var { x=10 } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectPattern',
						line: 1,
						column: 11,
						endLine: 1,
						endColumn: 12
					}
				]
			},
			{
				code: 'var {x=10 } = y',
				output: 'var { x=10 } = y',
				options: ['always'],
				errors: [
					{
						messageId: 'requireSpaceAfter',
						data: {token: '{'},
						type: 'ObjectPattern',
						line: 1,
						column: 5,
						endLine: 1,
						endColumn: 6
					}
				]
			},

			// never - arraysInObjects
			{
				code: "var obj = {'foo': [1, 2]};",
				output: "var obj = {'foo': [1, 2] };",
				options: ['never', {arraysInObjects: true}],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 25,
						endLine: 1,
						endColumn: 26
					}
				]
			},
			{
				code: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux']};",
				output: "var obj = {'foo': [1, 2] , 'bar': ['baz', 'qux'] };",
				options: ['never', {arraysInObjects: true}],
				errors: [
					{
						messageId: 'requireSpaceBefore',
						data: {token: '}'},
						type: 'ObjectExpression',
						line: 1,
						column: 49,
						endLine: 1,
						endColumn: 50
					}
				]
			}
		]
	});
};
