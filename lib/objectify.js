"use strict";

var _ = require('lodash');
var Stereotype = require('./stereotype');


/**
 * Stereotype registrations
 * @type {Object}
 * @private
 */
Objectify._stereotypes = {};

/**
 * Create object's with defaults
 * @constructor
 */
function Objectify() { }

exports = module.exports = new Objectify();

exports.Stereotype = Stereotype;

var stereotypes = {};
Object.defineProperties(stereotypes, {

  /**
   * Creates an object per the stored stereotype
   * @param {String} name - the name of the stereotype
   * @param {Object} [defaults] - the defaults that will be overridden
   */
  create: { value: function (name, defaults) {
    var self = this;
    var stereotype = self.stereotypes.get(name)
    return self.create(stereotype, defaults);
  }, enumerable: true, configurable: true },

  /**
   * Get all stereotypes
   * @returns {Object}
   */
  all: { value: function () { return Objectify._stereotypes; }, enumerable: true, configurable: false },

  /**
   * Is a stereotype registered by name
   * @param {String} name - the name of the stereotype
   * @return {Boolean}
   */
  can: { value: function (name) {
    return Objectify._stereotypes[name];
  }, enumerable: true, configurable: false },

  /**
   * Get an a stereotype registration by name
   * @param {String} name - the name of the stereotype
   * @return {Stereotype}
   */
  get: { value: function (name) {
    var self = this;
    if (self.stereotypes.can(name)) {
      return Objectify._stereotypes[name];
    }
    throw new Error('Stereotype not registered with the name ' + name);
  }, enumerable: true, configurable: false },

  /**
   * Registers a Stereotype by name
   * @param {String} name - the name of the stereotype
   * @param {Stereotype} stereotype - the object schema
   * return {Stereotype}
   */
  register: { value: function (name, stereotype) {
    var self = this;
    if (!self.stereotypes.can(name)) {
      Objectify._stereotypes[name] = stereotype;
      return stereotype;
    }
    throw new Error('Stereotype already registered with the name ' + name);
  }, enumerable: true, configurable: false },

  /**
   * Removes a Stereotype by name
   * @param {String} name - the name of the stereotype
   */
  remove: { value: function (name) {
    var self = this;
    if (self.stereotypes.can(name)) {
      delete Objectify._stereotypes[name];
    }
    throw new Error('Stereotype not found with the name ' + name);
  }, enumerable: true, configurable: false  }
});

Object.defineProperties(Objectify.prototype, {
  /**
   * The stereotypes api for interacting with the known stereotypes
   * @property {Object} stereotypes
   */
  stereotypes: { value: stereotypes, enumerable: true, configurable: false }
});

/**
 * Determine if the type is know to the system
 * @param type
 */
var isKnownType = function (type) {
  var basicTypes = ['string', 'number', 'boolean', 'object', 'array'];
  var customTypes = _.keys(Objectify._stereotypes);
  type = type.toLowerCase() || null;
  return type && (_.some(type, basicTypes) || _.some(type, customTypes));
};

var getTypeDefault = function (type) {
  switch type


};

/**
 * Creates an object settings it's default data  types or provided data types by it's json-schema.
 * @param {Stereotype} stereotype - the definition and shape of an object
 * @param {Object} [defaults] - values that will override the defaults
 */
Objectify.prototype.create = function (stereotype, defaults) {
  if (!stereotype)
    throw new Error('Stereotype is required');

  var definition = stereotype.definition;
  var properties = _.keys(definition);
  var instance = {};

  _.forEach(properties, function (prop) {
    var type = prop.type || null;
    if (!isKnownType(type))
      throw new Error('The property with type ' + type + ' is not defined.');


  });

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
  options = options || { checkRecursive: true, banUnknownProperties: true };
  if (!stereotype || !(stereotype instanceof Stereotype))
    throw new Error('Stereotype is required');
  return stereotype.validate(obj, options);
};