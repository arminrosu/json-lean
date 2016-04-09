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
	"numberString": "123e10",
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
        "123e10",
        [
            "Oscar"
        ],
        "I love deadlines. I like the whooshing sound they make as they fly by."
    ]
]
```
