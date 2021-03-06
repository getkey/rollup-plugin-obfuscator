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

		transform: options.fileOptions === false ? undefined : (code, id) => {
			if (!filter(id)) return null;

			const obfuscationResult = options.obfuscator.obfuscate(code, {
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
			const obfuscationResult = options.obfuscator.obfuscate(code, {
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
