"use strict";
var tv4 = require('tv4')
	, _ = require('lodash')
	, Schema = require('./schema')
	;

function Objectify() { }

var propDefaults = {enumerable:  true, configurable: false };
Object.defineProperties(Objectify.prototype, {
	schemas: {
		all: { enumerable:  true, configurable: false, value: {} },
		get: { enumerable:  true, configurable: false, value: {}},
		register: { enumerable:  true, configurable: false, value: {} },
		remove: { enumerable:  true, configurable: false, value: {} }
	}
});


exports = module.exports = new Objectify();

exports.Schema = Schema;

/**
 * Creates an object settings it's default data  types or provided data types by it's json-schema.
 * @param {Object} schema
 * @param {Object} [defaults]
 */
Objectify.prototype.create = function (schema, defaults) {
	if (!schema)
		throw new Error('Schema is required');
};


Objectify.prototype.validate = function (obj, schema, options) {
	obj = obj || {};
	if (!schema)
		throw new Error('Schema is required');
	options = options || { checkRecursive: true, banUnknownProperties: true };
	return tv4.validate(obj, schema, options.checkRecursive, options.banUnknownProperties);
};