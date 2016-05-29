'use strict';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var _ = require('lodash');
var Scrape = require('../index.js');

exports.parser_simple = {
	setUp: function(done) { done(); },
	default_options: function(test) {
		test.expect(4);

		var parser = new Scrape.Parser.Simple({
			formats: {
				gettext: true,
				underscore: true,
				double_underscore: true
			}
		});
		_.each(['test.cpp', 'test.js', 'test.php', 'test.twig'], function(fixture) {
			var result = parser.parse("./test/fixtures/" + fixture);
			test.equal(result.length, 9, 'translatable messages found should equal 9');
		});

		test.done();
	}
};
