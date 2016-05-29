"use strict";

var Lex = require('lex');
var fs = require('fs');
var _ = require('lodash');

var Simple = function(options) {
	this.options = _.defaultsDeep(options, {
		formats: {
			gettext: true,
			underscore: false,
			double_underscore: true
		},
		custom_rules: {
			single: [],
			plural: []
		},
		rules: {
			single: [/__\(.+?\)/g,   /gettext\(.+?\)/g],
			plural: [/__n\(.+?\)/g,  /ngettext\(.+?\)/g]
		}
	});

	this.rules = {
		single: [],
		plural: []
	};

	if(this.options.formats.gettext === true) {
		this.rules.single.push(/gettext\(.+?\)/g);
		this.rules.plural.push(/ngettext\(.+?\)/g);
	}

	if(this.options.formats.underscore === true) {
		this.rules.single.push(/_\(.+?\)/g);
		this.rules.plural.push(/_n\(.+?\)/g);
	}

	if(this.options.formats.double_underscore === true) {
		this.rules.single.push(/__\(.+?\)/g);
		this.rules.plural.push(/__n\(.+?\)/g);
	}

	this.reset();
};

Simple.prototype.reset = function() {
	var instance = this;

	this.currentLine = 1;
	this.currentFile = "unknown";
	this.messages = [];

	this.lexer = new Lex(function() { });
	this.lexer.addRule(/\n/, function() { instance.currentLine++; });

	var pushMessage = function(type, message, message_plural) {
		var message = {
			type: type,
			file: instance.currentFile,
			line: instance.currentLine,
			message: message
		};

		if(message_plural)
			message.message_plural = message_plural;

		instance.messages.push(message);
	};

	_.each(this.rules.single, function(rule) {
		instance.lexer.addRule(rule, function(match) {
			pushMessage("single", instance.extract(match, true));
		}, []);
	});

	_.each(this.rules.plural, function(rule) {
		instance.lexer.addRule(rule, function(match) {
			var single = instance.extract(match, false);
			var offset = 1 + match.indexOf(single) + single.length;
			var plural = instance.extract(match.substr(offset), true);

			if(!plural)
				return pushMessage("single", instance.unescape(single));

			pushMessage("plural", instance.unescape(single, true), plural);
		}, []);
	})
};

Simple.prototype.parse = function(file) {
	this.reset();
	this.currentFile = file;

	var source = fs.readFileSync(file).toString();
	this.lexer.setInput(source);
	this.lexer.lex();

	return this.messages;
};

Simple.prototype.extract = function(match, unescape) {
	var str = "";
	var quoteChar = null;

	for(var i = 0; i < match.length; i++) {
		var chr = match[i];

		if(!quoteChar && /["']/.test(chr)) {
			quoteChar = chr;
			continue;
		}

		if(chr == quoteChar && match.charAt(i - 1) != '\\')
			break;

		if(quoteChar)
			str = str + chr;
	}

	return unescape ? this.unescape(str) : str;
};

Simple.prototype.unescape = function(str) {
	return str.replace(/\\'/, '\'');
};

module.exports = Simple;
