var opentype = require('opentype.js');
var Bluebird = require('bluebird');
var _ = require('lodash');
var fs = require('fs');
var seedrandom = require('seedrandom');

Bluebird.promisifyAll(fs);

var mappableChars = ' .?!,:;abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function randomInt (rng, max) {
	return Math.floor(rng() * max);
}

function generateMapping (rng) {
	var eligibleKeys = _.clone(mappableChars);
	var mapping = {};
	_.each(mappableChars, function (char) {
		var key = eligibleKeys.splice(randomInt(rng, eligibleKeys.length), 1)[0];
		mapping[ key ] = char;
	});

	return mapping;
}

module.exports = function cipher (fontFile, outFile, seed) {
	var mapping;

	return Bluebird.fromNode(function (callback) {
		opentype.load(fontFile, callback);
	})
	.then(function (font) {
		var rng;

		if (seed) {
			rng = seedrandom(seed);
		}
		else {
			rng = Math.random;
		}

		mapping = generateMapping(rng);

		_.each(mapping, function (value, key) {
			var glyph = font.charToGlyph(key);
			if (!glyph) {
				throw new Error("Mapping key invalid");
			}

			glyph.unicode = value.charCodeAt(0);
			glyph.unicodes = [ value.charCodeAt(0) ];
		});

		var table = font.toTables();
		var bytes = table.encode();
		return fs.writeFileAsync(outFile, new Buffer(bytes), { encoding : 'binary' });
	})
	.then(function () {
		return mapping;
	});
};