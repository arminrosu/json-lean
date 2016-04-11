module.exports = (function() {

	/**
	 * Extract key and value trees.
	 * @param  {Object} obj - Object to leanify
	 * @param  {Boolean} [minify=true] - Flag to minify values
	 * @return {Array[]} - Array[0] will be the keys, Array[1] the values
	 */
	var encode = function(obj, minify) {
		var keys   = [];
		var values = [];
		var value;
		var minifyOn = (minify === undefined) ? true : minify;

		var objKeys = Object.keys(obj).sort();

		objKeys.forEach(function(key) {
			value = obj[key];

			if (isLeaf(value)) {
				keys.push(key);

				if (minifyOn) {
					values.push(minifyValue(value));
				} else {
					values.push(value);
				}

			} else {
				var encoded = encode(value, minifyOn);
				var k       = {};

				k[key] = encoded[0];

				keys.push(k);
				values.push(encoded[1]);
			}
		});

		return [keys, values];
	};

	/**
	 * Merge key&value arrays back to object.
	 * @param  {Array} array[0] - Array of keys
	 * @param  {Array} array[1] - Array of values
	 * @return {Object}
	 */
	var decode = function(array) {
		var keys   = array[0];
		var values = array[1];
		var result = {};

		keys.forEach(function(key, index) {
			var value = values[index];

			if (isLeaf(key)) {
				result[key] = value;
			} else if (typeof key === 'object') {
				var keyName = Object.keys(key)[0];

				result[keyName] = decode([key[keyName], value]);
			}

		});

		return result;
	};

	/**
	 * Minify certain value types.
	 * @param  {Boolean} value
	 * @return {Integer}
	 */
	var minifyValue = function(value) {
		// Boolean to Integer
		if (typeof value === 'boolean') {
			value = value | 0;

		// NumberString to Number
		} else if (
			typeof value === 'string' &&
			isNumber(value)
		) {
			var number = parseFloat(value);

			// Might already be in exponential notation and shorter
			// @NOTE We might misidentify exp. notation.
			if (value.length > number.toString().length - 2) {
				value = number;
			}
		}

		// Number
		if (typeof value === 'number') {
			var exp = value.toExponential();

			if (value.toString().length > exp.length + 2) {
				value = exp;
			}
		}

		return value;
	};

	/**
	 * Check if last key in tree
	 * @param  {string|Object} value [description]
	 * @return {Boolean}
	 */
	var isLeaf = function(value) {
		// Object
		if (typeof value === 'object' &&
			!Array.isArray(value) &&
			value !== null
		) {
			return false;
		}

		// Array
		// Boolean
		// null
		// Number
		// String
		return true;
	};

	/**
	 * Check if a string contains a number.
	 * @see {@link http://stackoverflow.com/a/35759874/584441|Stackoverflow source}
	 * @param  {string} string
	 * @return {Boolean}
	 */
	var isNumber = function(string) {
		return !isNaN(string) && !isNaN(parseFloat(string));
	};

	return {
		encode: encode,
		decode: decode
	};
})();
