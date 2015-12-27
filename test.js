var cipher = require('./index.js');
var _ = require('lodash');

cipher(
	'./Fanwood.otf',
	'./FanwoodCipher.otf',
	'seed'
)
.then(function (mapping) {
	var testString = _.map('Hello World'.split(''), function (char) {
		return mapping[char];
	}).join('');

	console.log(testString);
});