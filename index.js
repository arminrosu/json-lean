module.exports = (function() {

	/**
	 * Encode the JSON
	 * @param  {Array|Object} json
	 * @return {Array[]} - Array[0] will be the keys, Array[1] the values
	 */
	var encode = function(json) {
		if (Array.isArray(json)) {
			return encodeArray(json);
		}

		return encodeObject(json);
	};

	/**
	 * Extract key and value trees from Array.
	 * @param  {Array} array
	 * @return {Array[]}
	 */
	var encodeArray = function(array) {
		var keys   = [];
		var values = [];

		array.forEach(function(json) {
			var encoded = encode(json);

			keys.push(encoded[0]);
			values.push(encoded[1]);
		});

		return [keys, values];
	};

	/**
	 * Extract key and value trees from Object.
	 * @param  {Object} obj - Object to leanify
	 * @return {Array[]}
	 */
	var encodeObject = function(obj) {
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
	 * Merge key&value arrays
	 * @param  {Array} array[0] - Array of keys
	 * @param  {Array} array[1] - Array of values
	 * @return {Object|Array}
	 */
	var decode = function(array) {
		if (Array.isArray(array[0][0])) {
			return decodeArray(array);
		}

		return decodeObject(array);
	};

	/**
	 * Merge key&value arrays back to array.
	 * @param  {Array} array[0] - Array of keys
	 * @param  {Array} array[1] - Array of values
	 * @return {Array}
	 */
	var decodeArray = function(array) {
		var keys    = array[0];
		var values  = array[1];
		var results = [];

		keys.forEach(function(key, index) {
			results[index] = decode([keys[index], values[index]]);
		});

		return results;
	};

	/**
	 * Merge key&value arrays back to object.
	 * @param  {Array} array[0] - Array of keys
	 * @param  {Array} array[1] - Array of values
	 * @return {Object}
	 */
	var decodeObject = function(array) {
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
