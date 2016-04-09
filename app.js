module.exports = function() {

	/**
	 * Extract key and value trees.
	 * @param  {Object} obj - Object to leanify
	 * @param  {Boolean} [minify=true] - Flag to minify values
	 * @return {Array[]} - Array[0] will be the keys, Array[1] the values
	 */
	var encode = function(obj, minify) {
		var keys   = [];
		var values = [];
		var key;
		var value;
		var minifyOn = minify || true;

		for (key in obj) {
			value = obj[key];

			if (isEdge(value)) {
				keys.push(key);

				if (minifyOn) {
					values.push(minifyValue(value));
				} else {
					values.push(value);
				}

			} else {
				var encoded = encode(value);
				var k       = {};

				k[key] = encoded[0];

				keys.push(k);
				values.push(encoded[1]);
			}
		}

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

			if (isEdge(key)) {
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
		// Boolean to integer
		if (typeof value === 'boolean') {
			value = value | 0;
		}

		return value;
	};

	/**
	 * Check if last key in tree
	 * @param  {string|Object} key [description]
	 * @return {Boolean}
	 */
	var isEdge = function(key) {
		// Object
		if (typeof key === 'object' &&
			!Array.isArray(key) &&
			key !== null
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

	return {
		encode: encode,
		decode: decode
	};
}();
