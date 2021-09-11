import { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';

import { obfuscate, ObfuscationResult, ObfuscatorOptions } from 'javascript-obfuscator';

type FilterOptions = string | RegExp | (string | RegExp)[];

export interface RollupPluginObfuscatorOptions {
	/**
	 * Global options, applied when rendering chunks. Pass `false` to disable.
	 */
	globalOptions: ObfuscatorOptions | false,
	/**
	 * Per-file options, applied when transforming files, include/exclude works for this option. Pass `false` to disable.
	 */
	fileOptions: ObfuscatorOptions | false,
	/**
	 * Files to include when applying per-file obfuscation.
	 */
	include: FilterOptions,
	/**
	 * Files to exclude when applying per-file obfuscation. The priority is higher than `include`.
	 */
	exclude: FilterOptions,
	/**
	 * Overwrite the obfuscate method used.
	 */
	obfuscate: (sourceCode: string, inputOptions?: ObfuscatorOptions) => ObfuscationResult,
}

const defaultOptions = {
	globalOptions: {},
	fileOptions: {},
	include: ['**/*.js', '**/*.ts'],
	exclude: ['node_modules/**'],
	obfuscate,
};

export default (override: Partial<RollupPluginObfuscatorOptions>): Plugin => {
	const options: RollupPluginObfuscatorOptions = {
		...defaultOptions,
		...override,
	};
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'rollup-plugin-obfuscator',

		transform: options.fileOptions === false ? undefined : (code, id) => {
			if (!filter(id)) return null;

			const obfuscationResult = options.obfuscate(code, {
				...options.fileOptions,
				inputFileName: id,
				sourceMap: true,
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		},
		renderChunk: options.globalOptions === false ? undefined : (code, { fileName }) => {
			const obfuscationResult = options.obfuscate(code, {
				...options.globalOptions,
				inputFileName: fileName,
				sourceMap: true,
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		}
	};
};
