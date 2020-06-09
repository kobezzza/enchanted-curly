# eslint-plugin-curly

A set of more customizable rules for eslint/curly than original rules.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-curly`:

```
$ npm install eslint-plugin-curly --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-curly` globally.

## Usage

Add `curly` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "curly"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "curly/rule-name": 2
  }
}
```

## Supported Rules

* [object-curly-spacing](docs/rules/object-curly-spacing.md)

