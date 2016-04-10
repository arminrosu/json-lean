var fs   = require('fs');
var json = fs.readFileSync('samples/example.json', 'utf8');
// Facebook.com/Coca-Cola graph api response
// var json = fs.readFileSync('samples/facebook.coca-cola.json', 'utf8');
var obj    = JSON.parse(json);
var lean   = require('./app.js');
var minify = require('./lib/minify.js');

var encoded = lean.encode(obj);
var decoded = lean.decode(encoded);

fs.writeFileSync('output/encoded.json', JSON.stringify(encoded, null, '\t'), 'utf8');
fs.writeFileSync('output/keys.json', JSON.stringify(encoded[0], null, '\t'), 'utf8');
fs.writeFileSync('output/values.json', JSON.stringify(encoded[1], null, '\t'), 'utf8');

fs.writeFileSync('output/decoded.json', minify(JSON.stringify(decoded, null, '\t')), 'utf8');

fs.writeFileSync('output/original.json', JSON.stringify(obj, null, '\t'), 'utf8');
