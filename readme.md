# rollup-plugin-obfuscator

![npm](https://img.shields.io/npm/v/rollup-plugin-obfuscator)

The most powerful rollup plugin for [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

```sh
yarn add --dev rollup-plugin-obfuscator javascript-obfuscator
```

or

```sh
npm install --save-dev rollup-plugin-obfuscator javascript-obfuscator
```

## Why?

There is already [a plugin for this](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator), but it's outdated and not powerful enough for me.

With this plugin **you** install `javascript-obfuscator` separately from the plugin (as you saw in the installation instructions above). You will always be able to update it, even if this plugin stops being maintained.

Additionally, it's much more powerful because you can apply obfuscation settings:

- per file
- to the whole bundle

The point is that you can avoid obfuscating your open-source dependencies, which results in a **huge performance boost**.

## Usage

```js
import obfuscator from 'rollup-plugin-obfuscator';

export default {
	input: 'src/main.js',
	plugins: [
		obfuscator({
			fileOptions: {
				// Your javascript-obfuscator options here
				// Will be applied on each file separately. Set to `false` to disable
				// See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
			},
			globalOptions: {
				// Your javascript-obfuscator options here
				// Will be applied on the whole bundle. Set to `false` to disable
				// See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
			},
		}),
	]
}
```

## Options

### `globalOptions`

Type: `Object` | `false`<br/>
Default: `{}`

Options that will be passed to javascript-obfuscator when it processes each file. If you don't want each of your file to be processed individually, you can set this to `false`.
See allowed options [here](https://github.com/javascript-obfuscator/javascript-obfuscator).

### `fileOptions`

Type: `Object` | `false`<br/>
Default: `{}`

Options that will be passed to javascript-obfuscator when it processes the whole bundle. If you don't want to apply the obfuscation to the whole bundle, you can set this to `false`.
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
