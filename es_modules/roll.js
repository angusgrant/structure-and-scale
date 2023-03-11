

	// Dice sizes
	let dice = {
		d2: [1, 2],
		d4: [1, 2, 3, 4],
		d6: [1, 2, 3, 4, 5, 6],
		d8: [1, 2, 3, 4, 5, 6, 7, 8],
		d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
	};

	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param  {Array} array The array to shuffle
	 * @return {Array}       The shuffled array
	 */
	function shuffle (array) {

		let currentIndex = array.length;
		let temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;

	}

	/**
	 * Shuffle dice array and return first number
	 * @param  {Number} n The dice size to roll
	 * @return {Number}   The result
	 */
	function getRoll (n) {
		if (!dice[n]) return 0;
		shuffle(dice[n]);
		return dice[n][0];
	}

	/**
	 * Roll a D2
	 * @return {Number} The result
	 */
	function d2 () {
		return getRoll('d2');
	}

	/**
	 * Roll a D4
	 * @return {Number} The result
	 */
	function d4 () {
		return getRoll('d4');
	}

	/**
	 * Roll a D6
	 * @return {Number} The result
	 */
	function d6 () {
		return getRoll('d6');
	}

	/**
	 * Roll a D8
	 * @return {Number} The result
	 */
	function d8 () {
		return getRoll('d8');
	}

	/**
	 * Roll a D10
	 * @return {Number} The result
	 */
	function d10 () {
		return getRoll('d10');
	}

	/**
	 * Roll a D12
	 * @return {Number} The result
	 */
	function d12 () {
		return getRoll('d12');
	}

	/**
	 * Roll a D20
	 * @return {Number} The result
	 */
	function d20 () {
		return getRoll('d20');
	}

	export {d2, d4, d6, d8, d10, d12, d20};

