var fs   = require('fs');
// { setup section
var OUTPUT = './output';
// create the _output_ folder if it does not exist
try {fs.accessSync(OUTPUT)} catch(e) {
	if (e.code === 'ENOENT') {
		// folder does not exist, let's create it
		fs.mkdirSync(OUTPUT, 0o755);
	} else {
		// rethrow
		console.warn('Access to output directory failed');
		throw e;
	}
}

// clean the output folder
rmDirContents = function rmDir(dirPath) {
	// https://gist.github.com/liangzan/807712#gistcomment-337828
	try { var files = fs.readdirSync(dirPath); }
	catch(e) { return; }
	if (files.length > 0)
		for (var i = 0; i < files.length; i++) {
			var filePath = dirPath + '/' + files[i];
			if (fs.statSync(filePath).isFile())
				fs.unlinkSync(filePath);
			else
				rmDir(filePath);
		}
};
rmDirContents(OUTPUT);
// end setup section }

var json = fs.readFileSync('samples/example.json', 'utf8');
// Facebook.com/Coca-Cola graph api response
// var json = fs.readFileSync('samples/facebook.coca-cola.json', 'utf8');
var obj    = JSON.parse(json);
var lean   = require('./index.js');
var minify = require('./lib/minify.js');

var encoded = lean.encode(obj);
var decoded = lean.decode(encoded);

fs.writeFileSync(OUTPUT + '/encoded.json', JSON.stringify(encoded, null, '\t'), 'utf8');
fs.writeFileSync(OUTPUT + '/keys.json', JSON.stringify(encoded[0], null, '\t'), 'utf8');
fs.writeFileSync(OUTPUT + '/values.json', JSON.stringify(encoded[1], null, '\t'), 'utf8');

fs.writeFileSync(OUTPUT + '/decoded.json', minify(JSON.stringify(decoded, null, '\t')), 'utf8');

fs.writeFileSync(OUTPUT + '/original.json', JSON.stringify(obj, null, '\t'), 'utf8');
