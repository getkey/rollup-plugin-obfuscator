# rollup-plugin-obfuscator

The most powerful rollup plugin for [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

```sh
$ yarn add rollup-plugin-obfuscator
```

## Why?

There is already [a plugin for this](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator), but it's outdated and not powerful enough for me.

I'm not saying I'll be any better at maintaining this plugin, but I give you the option to supply your own version of `javascript-obfuscator`.

Additionally, the nice thing about this plugin is that it allows you to apply obfuscation settings:

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
			// options that will be passed to javascript-obfuscator
			// when it processes each file
			// see allowed options here https://github.com/javascript-obfuscator/javascript-obfuscator
			fileOptions: {
				// your options here
			},

			// options that will be passed to javascript-obfuscator
			// when it processes the whole bundle
			// see allowed options here https://github.com/javascript-obfuscator/javascript-obfuscator
			// if you don't want to apply the obfuscation to the whole bundle, you can set this to `false`
			globalOptions: {
				// your options here
			},

			// on which files to apply the `fileOptions`
			include: ['**/*.js', '**/*.ts'],

			// on which files not to apply the `fileOptions`
			exclude: ['node_modules/**'],

			// this plugin supplies javascript-obfuscator but you are free to override it if you want
			obfuscator: require('javascript-obfuscator'), 
		}),
	]
}
```

Note that a couple javascript-obfuscator options are forced. This is necessary for this plugin to work. Check out which ones you can't use [here](https://github.com/getkey/rollup-plugin-obfuscator/blob/master/rollup-plugin-obfuscator.js).
