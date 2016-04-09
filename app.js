var fs   = require('fs');
var json = fs.readFileSync('samples/example.json', 'utf8');
var obj  = JSON.parse(json);

var encode = function(obj) {
	var keys   = [];
	var values = [];
	var key;
	var value;

	for (key in obj) {
		value = obj[key];

		if (isEdge(value)) {
			keys.push(key);

			values.push(minifyValue(value));
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

var minifyValue = function(value) {
	// Boolean to integer
	if (typeof value === 'boolean') {
		value = value | 0;
	}

	return value;
};

var isEdge = function(value) {
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

var encoded = encode(obj);
var decoded = decode(encoded);

fs.writeFileSync('output/encoded.json', JSON.stringify(encoded), 'utf8');
fs.writeFileSync('output/keys.json', JSON.stringify(encoded[0]), 'utf8');
fs.writeFileSync('output/values.json', JSON.stringify(encoded[1]), 'utf8');
fs.writeFileSync('output/decoded.json', JSON.stringify(decoded), 'utf8');
fs.writeFileSync('output/original.json', JSON.stringify(obj), 'utf8');
