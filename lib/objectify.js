"use strict";

var _ = require('lodash');
var Stereotype = require('./sterotype');


/**
 * Stereotype registrations
 * @type {{}}
 * @private
 */
Objectify._stereotypes = {};

/**
 * Create object's with defaults
 * @constructor
 */
function Objectify() { }

exports = module.exports = new Objectify();

exports.Schema = Stereotype;

var stereotypes = {};
Object.defineProperties(stereotypes, {

	/**
	 * Creates an object per the stored stereotype
	 * @param {String} name - the name of the stereotype
	 * @param {Object} [defaults] - the defaults that will be overridden
	 */
	create: { value: function (name, defaults) {}, enumerable: true, configurable: true },

	/**
	 * Get all stereotypes
	 * @returns {Object}
	 */
	all: { value: function () { return Objectify._stereotypes; }, enumerable: true, configurable: false },

	/**
	 *
	 */
	can: { value: function (name) {}, enumerable: true, configurable: false },

	/**
	 *
	 */
	get: { value: function (name) {}, enumerable: true, configurable: false },

	/**
	 *
	 */
	register: { value: function (name, stereotype) {}, enumerable: true, configurable: false },

	/**
	 *
	 */
	remove: { value: function (name) {}, enumerable: true, configurable: false  }
});

Object.defineProperties(Objectify.prototype, {
	/**
	 * The stereotypes api for interacting with the known stereotypes
	 * @property {Object} stereotypes
	 */
	stereotypes: { value: stereotypes, enumerable: true, configurable: false }
});

/**
 * Creates an object settings it's default data  types or provided data types by it's json-schema.
 * @param {Object} stereotype
 * @param {Object} [defaults]
 */
Objectify.prototype.create = function (stereotype, defaults) {
	if (!stereotype)
		throw new Error('Sterotype is required');
};

/**
 * Performs validation on an object against the object's stereotypical definition.
 * @param obj
 * @param stereotype
 * @param options
 * @returns {boolean}
 */
Objectify.prototype.validate = function (obj, stereotype, options) {
	obj = obj || {};
	if (!stereotype)
		throw new Error('Sterotype is required');
	options = options || { checkRecursive: true, banUnknownProperties: true };
//	return tv4.validate(obj, schema, options.checkRecursive, options.banUnknownProperties);
	return true;
};