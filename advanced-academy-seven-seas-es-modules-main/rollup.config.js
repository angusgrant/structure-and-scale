let files = ['dice.js', 'index.js', 'treasure.js'];

export default files.map(function (file){
    return {
	input: `src/${file}`,
	output: {
		file: file,
		format: 'iife'
	}
};
});
