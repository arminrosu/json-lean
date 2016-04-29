var assert       = require('assert');
var lean         = require('./index.js');
var sampleObject = {
	array: [
		1,
		2
	],
	integer: 1042,
	boolean: false,
	object:  {
		name: 'Oscar'
	},
	string: 'I love deadlines. I like the whooshing sound they make as they fly by.'
};

var encodedObject = lean.encode(sampleObject);
var decodedObject = lean.decode(encodedObject);

// Travis doesn't display the entire output, so we print it here
console.log('=== JSON-Lean ===');
console.log('Keys: ');
console.log(encodedObject[0]);
console.log('Values: ');
console.log(encodedObject[1]);

// Test
process.on('exit', function() {
	// ~~~~~~~~~~
	// OBJECT
	// ~~~~~~~~~~

	// Keys have been successfully extracted
	assert.deepEqual(encodedObject[0], ['array', 'boolean', 'integer', {
		object: ['name']
	}, 'string']);

	// Values have been successfully extracted
	assert.deepEqual(encodedObject[1], [[1, 2], false, 1042, ['Oscar'], 'I love deadlines. I like the whooshing sound they make as they fly by.']);

	// Decode is same as source
	// @NOTE Keys are in alphabetic order
	assert.deepEqual(decodedObject, {
		array: [
			1,
			2
		],
		boolean: false,
		integer: 1042,
		object:  {
			name: 'Oscar'
		},
		string: 'I love deadlines. I like the whooshing sound they make as they fly by.'
	});



	process.reallyExit(0);
});
