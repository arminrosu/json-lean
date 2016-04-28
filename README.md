# JSON-Lean

Extract/Merge key and value trees from a JSON.

It is useful if you make multiple requests and the response object has the same structure. You can respond only with the data.

## Example

Check out [sampler.js](./sampler.js) for more examples.

### Input:

```json
{
	"array": [
		1,
		2
	],
	"integer": 1042,
	"boolean": false,
	"object": {
		"name": "Oscar"
	},
	"string": "I love deadlines. I like the whooshing sound they make as they fly by."
}
```

### Output - Keys

This should be stored with the client.

Once the first (unencoded) request is made, you should make requests to the encoded endpoint.

Keys are sorted.

```json
[
	"array",
	"boolean",
	"integer",
	{
		"object": [
			"name"
		]
	},
	"string"
]
```

### Output - Values

This example is **34% smaller** than the original JSON with keys.

```json
[
	[
		1,
		2
	],
	false,
	1042,
	[
		"Oscar"
	],
	"I love deadlines. I like the whooshing sound they make as they fly by."
]
```

### Recombine

Decoding is transparent. You can add it as a step before your actual data parsing.

```json
{
	"array": [
		1,
		2
	],
	"boolean": false,
	"integer": 1042,
	"object": {
		"name": "Oscar"
	},
	"string": "I love deadlines. I like the whooshing sound they make as they fly by."
}
```

## Even less?

Check out [json-slim](https://github.com/arminrosu/json-slim) for minify the output JSON even further.
