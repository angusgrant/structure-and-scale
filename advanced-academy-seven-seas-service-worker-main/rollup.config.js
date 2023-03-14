// The files to bundle
let files = ['index.js', 'treasure.js', 'dice.js'];

export default files.map(function (file) {
	return {
		input: `src/${file}`,
		output: {
			file: file,
			format: 'iife'
		}
	};
});