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
var fs = require('fs');
var Scrape = require('../index.js');

exports.generator_pot = {
	setUp: function(done) { done(); },
	default_options: function(test) {
		test.expect(1);

		var generator = new Scrape.Generator.POT({
		});

		var input = fs.readFileSync("./test/fixtures/pot_input.json").toString();
		var expected = fs.readFileSync("./test/expected/test.pot").toString();
		var result = generator.generate(JSON.parse(input));
		test.equals(result, expected, 'output POT file should match the expected POT file');

		test.done();
	}
};
