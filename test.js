var assert = require('assert');
var lean   = require('./index.js');

// JSON Object
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

// JSON Array
var sampleArray  = [sampleObject, sampleObject];
var encodedArray = lean.encode(sampleArray);
var decodedArray = lean.decode(encodedArray);

// Test
process.on('exit', function() {
	var expectedKeys = ['array', 'boolean', 'integer', {
		object: ['name']
	}, 'string'];
	var expectedValues = [[1, 2], false, 1042, ['Oscar'], 'I love deadlines. I like the whooshing sound they make as they fly by.'];
	// @NOTE Keys are in alphabetic order
	var expectedObject = {
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
	};

	// ~~~~~~~~~~
	// OBJECT
	// ~~~~~~~~~~

	// Keys have been successfully extracted
	assert.deepEqual(encodedObject[0], expectedKeys, 'Object: Keys don\'t match');

	// Values have been successfully extracted
	assert.deepEqual(encodedObject[1], expectedValues, 'Object: Values don\'t match');

	// Decode is same as source
	assert.deepEqual(decodedObject, expectedObject, 'Object: Decoded objects don\'t  match');

	// ~~~~~~~~~~
	// ARRAY
	// ~~~~~~~~~~

	// Keys have been successfully extracted
	assert.deepEqual(encodedArray[0], [expectedKeys, expectedKeys], 'Array: Keys don\'t match');

	// Values have been successfully extracted
	assert.deepEqual(encodedArray[1], [expectedValues, expectedValues], 'Array: Values don\'t match');

	// Decode is same as source
	assert.deepEqual(decodedArray, [expectedObject, expectedObject], 'Array: Decoded arrays don\'t match');

	process.reallyExit(0);
});
