"use strict";
var schema = require('validate');

/**
 * An object's stereotypical definition
 *
 * @param {Object} definition
 * @param {Object} [options]
 * @param {Boolean} [options.typecast] - defaults to true
 * @constructor
 */
function Sterotype(definition, options) {
	options = options || { typecast: true };
	if (!definition) {
		throw new Error('Stereotype definition is required.');
	}
	this.definition = schema(definition, options);
}

/**
 * Validates an instance of an object against the Stereotypical type
 *
 *
 * @param {*} instance
 * @param {Object} [options]
 * @param {Boolean} [options.typecast] - defaults to true
 * @returns {*|Object|String|Boolean}
 *
 */
var performValidation = function (instance, options) {
	var self = this;
	options = options || { typecast: true };
	if (!instance) {
		throw new Error('Instance is required.');
	}
	return self.validate(instance, options);
};

Object.defineProperties(Sterotype.prototype, {
	definition: {
		enumerable: true,
		configurable: false,
		writable: true
	},
	validate: {
		value: performValidation,
		enumerable: true,
		configurable: false
	}
});

exports = module.exports = Sterotype;
