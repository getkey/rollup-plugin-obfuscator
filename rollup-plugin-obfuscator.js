const obfuscator = require('javascript-obfuscator');
const createFilter = require('rollup-pluginutils').createFilter;

const defaultOptions = {
	globalOptions: {},
	fileOptions: {},
	include: ['**/*.js', '**/*.ts'],
	exclude: ['node_modules/**'],
	obfuscator,
};

module.exports = options => {
	options = {
		...defaultOptions,
		...options,
	};
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'rollup-plugin-obfuscator',

		transform: (code, id) => {
			if (!filter(id)) return null;

			const obfuscationResult = options.obfuscator.obfuscate(code, {
				...options.fileOptions,
				inputFileName: id,
				reservedNames: [ '.' ], // prevents modifying the import/export identifiers
				reservedStrings: [ 'a^' ], // never matches, necessary to enable `reservedNames`, see https://github.com/javascript-obfuscator/javascript-obfuscator/issues/327
				sourceMap: true,
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		},
		renderChunk: (code, { fileName }) => {
			if (options.globalOptions === false) return null;

			const obfuscationResult = options.obfuscator.obfuscate(code, {
				...options.globalOptions,
				inputFileName: fileName,
				sourceMap: true,
				reservedNames: [ '.' ], // TODO: find why that's necessary
				reservedStrings: [ 'a^' ], // never matches, necessary to enable `reservedNames`, see https://github.com/javascript-obfuscator/javascript-obfuscator/issues/327
			});

			return {
				code: obfuscationResult.getObfuscatedCode(),
				map: obfuscationResult.getSourceMap(),
			};
		}
	};
};
