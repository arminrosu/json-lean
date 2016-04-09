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

```json
[
	// Keys
    [
        "array",
        "boolean",
        "integer",
        "float",
        "numberString",
        {
            "object": [
                "name"
            ]
        },
        "string"
    ],
	// Values
    [
        [
            1,
            2,
            3
        ],
		// Boolean converted to integer
		0,
		1042,
		10.5,
		// largeNumber is shorter in Exponential Notation
		"1.5e+10",
		// JSON.parse() automatically converts this to integer :(
		162000,
		"162e5",
		"123e10",
		[
			"Oscar"
		],
		"I love deadlines. I like the whooshing sound they make as they fly by."
    ]
]
```

Also check out _sampler.js_ for more examples.
