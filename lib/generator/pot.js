"use strict";

var Lex = require('lex');
var fs = require('fs');
var _ = require('lodash');

var POT = function(options) {
	this.options = _.defaultsDeep(options, {
	});
};

POT.prototype.generate = function(messages) {
	var output = 'msgid ""\nmsgstr ""\n';
	output += '"Content-Type: text/plain; charset=utf-8\\n"\n';
	output += '"Content-Transfer-Encoding: 8bit\\n"\n';
	output += '"Project-Id-Version: \\n"\n\n';

	output += '#. The alignment (left or right) of your language\n';
	output += 'msgid "align"\nmsgstr ""\n\n';

	var single = this.reduce("single", messages);
	for(var str in single) {
		var message = single[str];
		output += '#: ' + message.references.join(' ') + '\n';
		output += 'msgid "' + message.message + '"\n';
		output += 'msgstr ""\n\n';
	}

	var plural = this.reduce("plural", messages);
	for(var str in plural) {
		var message = plural[str];
		output += '#: ' + message.references.join(' ') + '\n';
		output += 'msgid "' + message.message + '"\n';
		output += 'msgid_plural "' + message.message_plural + '"\n';
		output += 'msgstr[0] ""\n';
		output += 'msgstr[1] ""\n\n';
	}

	return output;
};

POT.prototype.reduce = function(type, messages) {
	var output = {};

	for(var i = 0; i < messages.length; i++) {
		var message = messages[i];
		if(message.type != type)
			continue;

		if(!output[message.message])
			output[message.message] = {message: message.message, message_plural: message.message_plural, references: []};

		output[message.message].references.push(message.file + ":" + message.line);
	}

	return output;
}

module.exports = POT;
