# rollup-plugin-obfuscator

[![npm](https://img.shields.io/npm/v/rollup-plugin-obfuscator)](https://www.npmjs.com/package/rollup-plugin-obfuscator)

The most powerful rollup plugin for [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

```sh
yarn add --dev rollup-plugin-obfuscator javascript-obfuscator
```

or

```sh
npm install --save-dev rollup-plugin-obfuscator javascript-obfuscator
```

## Features

1. javascript-obfuscator is installed separately from the rollup plugin, so it will always be updatable (unlike the official rollup plugin which has been outdated for years!)
2. You can decide if you prefer to apply obfuscation:
	- the traditional way, to the whole bundle
	- to each file separately, avoiding obfuscating your open-source dependencies, which results in a **huge performance boost**

## Usage

```js
import obfuscator from 'rollup-plugin-obfuscator';

export default {
	input: 'src/main.js',
	plugins: [
		obfuscator({
			options: {
				// Your javascript-obfuscator options here
				// See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
			},
		}),
	]
}
```

## Options

### `global`

Type: `boolean`<br/>
Default: `false`

Set to `true` if you want to obfuscate the whole bundle, `false` to obfuscate each file separately.

### `options`

Type: `Object`<br/>
Default: `{}`

Options that will be passed to javascript-obfuscator.
See allowed options [here](https://github.com/javascript-obfuscator/javascript-obfuscator).

### `include`

Type: `String | RegExp | Array[...String|RegExp]`<br/>
Default: `['**/*.js', '**/*.ts']`

Which files to obfuscate. This parameter is ignored when `global` is `true`.

### `exclude`

Type: `String | RegExp | Array[...String|RegExp]`<br/>
Default: `['node_modules/**']`

Which files not to obfuscate. This parameter is ignored when `global` is `true`.

### `obfuscator`

Type: `JavascriptObfuscator`<br/>
Default: `require('javascript-obfuscator')`

This plugin uses the version of `javascript-obfuscator` you installed alongside with it, but you are free to override it (for example, if you want to use a fork).
