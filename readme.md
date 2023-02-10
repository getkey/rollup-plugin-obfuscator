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

## Why was this plugin made?

1. javascript-obfuscator is installed separately from the rollup plugin, so it will always be updatable
2. with this plugin, you can decide if you prefer to apply obfuscation to:
	a. each file, to avoid obfuscating your open-source dependencies, which results in a **huge performance boost**
	b. the whole bundle

## Usage

```js
import obfuscator from 'rollup-plugin-obfuscator';

export default {
	input: 'src/main.js',
	plugins: [
		obfuscator({
			options: {
				// Your javascript-obfuscator options here
				// Will be applied on each file separately.
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

Type: `String` | `Array[...String]`<br/>
Default: `['**/*.js', '**/*.ts']`

Which files to obfuscate with `fileOptions`.

### `exclude`

Type: `String` | `Array[...String]`<br/>
Default: `['node_modules/**']`

Which files to skip applying `fileOptions` on.

### `obfuscator`

Type: `JavascriptObfuscator`<br/>
Default: `require('javascript-obfuscator')`

This plugin uses the version of `javascript-obfuscator` you installed alongside with it, but you are free to override it (for example, if you want to use a fork).
