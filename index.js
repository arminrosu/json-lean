module.exports = (function() {

	/**
	 * Extract key and value trees.
	 * @param  {Object} obj - Object to leanify
	 * @return {Array[]} - Array[0] will be the keys, Array[1] the values
	 */
	var encode = function(obj) {
		var keys   = [];
		var values = [];
		var value;
		var objKeys = Object.keys(obj).sort();

		objKeys.forEach(function(key) {
			value = obj[key];

			if (isLeaf(value)) {
				keys.push(key);

				values.push(value);

			} else {
				var encoded = encode(value);
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

	return {
		encode: encode,
		decode: decode
	};
})();
