# JSON-Lean

Extract/Merge key and value trees from a JSON.

It is useful if you make multiple requests and the response object has the same structure. You can respond only with the data.

## Example

Input:

```json
{
	"array": [1, 2, 3],
	"boolean": false,
	"integer": 1042,
	"float": 10.5,
	"largeNumber": 15000000000,
	"exponent": 162e3,
	"exponentString": "162e+5",
	"numberString": "123e+10",
	"object": {
		"name": "Oscar"
	},
	"string": "I love deadlines. I like the whooshing sound they make as they fly by."
}
```

Output:

```js
[
	// Keys, sorted
	[
		"array",
		"boolean",
		"exponent",
		"exponentString",
		"float",
		"integer",
		"largeNumber",
		"numberString",
		{
			"object": [
				"name"
			]
		},
		"string"
	],
	// Values, in corresponding order
	[
		[
			1,
			2,
			3
		],
		// Boolean converted to integer
		0,
		// JSON.parse() automatically converts 162e3 to integer :(
		162000,
		"162e+5",
		10.5,
		1042,
		// largeNumber is shorter in Exponential Notation
		"1.5e+10",
		"123e+10",
		[
			"Oscar"
		],
		"I love deadlines. I like the whooshing sound they make as they fly by."
	]
]
```

And back:

```json
{
	"array": [
		1,
		2,
		3
	],
	"boolean": 0,
	"exponent": 162000,
	"exponentString": "162e+5",
	"float": 10.5,
	"integer": 1042,
	"largeNumber": "1.5e+10",
	"numberString": "123e+10",
	"object": {
		"name": "Oscar"
	},
	"string": "I love deadlines. I like the whooshing sound they make as they fly by."
}
```

Also check out [sampler.js](./sampler.js) for more examples.
