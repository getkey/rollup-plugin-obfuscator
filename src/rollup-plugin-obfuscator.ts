import { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';

import { obfuscate, ObfuscationResult, ObfuscatorOptions } from 'javascript-obfuscator';

type FilterOptions = string | RegExp | (string | RegExp)[];

export interface RollupPluginObfuscatorOptions {
	/**
	 * Set to `true` if you want to obfuscate the whole bundle, `false` to obfuscate each file separately.
	 * @default false
	 */
	global: boolean,
	/**
	 * javascript-obfuscator options. Refer to documentation here https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
	 * @default {}
	 */
	options: ObfuscatorOptions,
	/**
	 * Files to include when applying per-file obfuscation.
	 * @default ['**\/*.js', '**\/*.ts']
	 */
	include: FilterOptions,
	/**
	 * Files to exclude when applying per-file obfuscation. The priority is higher than `include`.
	 * @default ['node_modules/**']
	 */
	exclude: FilterOptions,
	/**
	 * Overwrite the obfuscate method used.
	 */
	obfuscate: (sourceCode: string, inputOptions?: ObfuscatorOptions) => ObfuscationResult,
}

const defaultOptions = {
	global: false,
	options: {},
	include: ['**/*.js', '**/*.ts'],
	exclude: ['node_modules/**'],
	obfuscate,
};

function rollupPluginObfuscator (override: Partial<RollupPluginObfuscatorOptions>): Plugin {
	const options: RollupPluginObfuscatorOptions = {
		...defaultOptions,
		...override,
	};
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'rollup-plugin-obfuscator',

		transform: options.global ? undefined : (code, id) => {
			if (!filter(id)) return null;

			const obfuscationResult = options.obfuscate(code, {
				...options.options,
				inputFileName: id,
				sourceMap: true,
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		},
		renderChunk: !options.global ? undefined : (code, { fileName }) => {
			const obfuscationResult = options.obfuscate(code, {
				...options.options,
				inputFileName: fileName,
				sourceMap: true,
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		}
	};
}

export default rollupPluginObfuscator;
// unfortunately, TypeScript won't generate the following for us
// see https://github.com/microsoft/TypeScript/issues/2719
// but we can assume we're always in a CommonJS environment. Right? ...Right?
module.exports = rollupPluginObfuscator;
