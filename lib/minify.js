module.exports = function() {
	/**
	 * Minify values in JSON.
	 * Doesn't minify the JSON. Use JSON.stringify() without `space` parameter for that.
	 * @param  {string} string - JSON string to minify.
	 * @return {string}
	 */
	var minifyOutput = function(string) {
		// Minify Numbers
		var numbers = getNumbers(string);
		numbers.reverse();

		// Replace them for shorter versions
		// In reverse order so we don't affect indexes
		numbers.forEach(function(match) {
			string = spliceStrings(string, match.string, minifyNumber(match.string), match.index);
		});

		return string;
	};

	/**
	 * Find all Number values in a JSON
	 * @param  {string} string
	 * @return {Object[]} - Array of matched numers, with index
	 */
	var getNumbers = function(string) {
		var regexp  = /(?:[^\\]": ?)("?[\d\.eE\+]+"?)(?:,)/g;
		var matches = [];
		var match   = regexp.exec(string);

		while (match != null) {
			matches.push({
				string: match[1],
				index:  match.index + match[0].indexOf(match[1])
			});
			match = regexp.exec(string);
		}

		return matches;
	};

	/**
	 * Replace a string in string at index
	 * @param  {string} haystack - String to operate on
	 * @param  {string} needle - String to replace
	 * @param  {string} replacement - String to replace the needle with
	 * @param  {integer} start - Index at which to start changing the string
	 * @return {string}
	 */
	var spliceStrings = function(haystack, needle, replacement, start) {
		return haystack.substring(0, start) + replacement + haystack.substring(start + needle.length);
	};

	/**
	 * Represent Number in a shorter form
	 * @param  {string} string
	 * @return {string}
	 */
	var minifyNumber = function(string) {
		string = string.replace(/"/g, '');

		if (!isNumber(string)) {
			return string;
		}

		var value = parseFloat(string);

		// Exponential
		var exp = value.toExponential();

		if (string.length > exp.length) {
			string = exp;
		}

		// Exponential notation is positive by default
		string = string.replace('+', '');

		return value.toString().length > string.length ? string : value.toString();
	};

	/**
	 * Check if a string contains a number.
	 * @TODO This is a duplicate of index.js#isNumber
	 * @see {@link http://stackoverflow.com/a/35759874/584441|Stackoverflow source}
	 * @param  {string} string
	 * @return {Boolean}
	 */
	var isNumber = function(string) {
		return !isNaN(string) && !isNaN(parseFloat(string));
	};

	return minifyOutput;
}();
