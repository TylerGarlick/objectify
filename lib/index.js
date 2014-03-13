'use strict';

var _ = require('lodash'),
  Schema = require('./schema'),
  ObjectifyError = require('./errors');

var BASIC_TYPES = {
  string: new Schema('string', { default: ""}),
  number: new Schema('number', { default: 0}),
  array: new Schema('array', { default: [] }),
  date: new Schema('date', { default: new Date()}),
  object: new Schema('object', { default: {} })
};

var _reg = {};
var _schemas = {};

/**
 * Create, and validate objects
 * @property schemas - access to the schemas
 * @property can - helper method to determine if a type is registered and can be instantiated
 * @constructor
 */
function Objectify() {

  Object.defineProperties(_schemas, {

    all: {
      /**
       * All registered Schemas
       * @returns {Object}
       */
      get: function () {
        return _reg;
      }
    },

    can: {
      /**
       * Can objectify create the object from a schema?
       * @param name
       * @returns {Boolean}
       */
      value: function (name) {
        if (!name || name.length == 0)
          throw new ObjectifyError('Name is required');
        return _.has(_reg, name);
      },
      enumerable: true,
      configurable: false
    },

    clear: {
      /**
       * Clears all schema registrations
       */
      value: function () {
        _reg = {};
        _.merge(_reg, BASIC_TYPES);
      },
      enumerable: true,
      configurable: false
    },

    register: {
      /**
       * Registers a schema with Objectify
       * @param name - the name of the schema
       * @param {Schema} schema - the Schema
       * @returns {Schema}
       */
      value: function (name, schema) {
        var self = this;

        if (!name || name.length == 0) throw new Error("Name is required");
        if (!(schema instanceof Schema)) throw new Error("Schema parameter must be of type 'Schema'");

        if (!self.can(name))
          _reg[name] = schema;
        else
          throw new Error('A type with the name ' + name + ' has already been defined');

        return schema;
      },
      enumerable: true,
      configurable: false
    },

    get: {
      /**
       * Gets a registered Schema by name
       * @param name - the name given to the Schema
       * @returns {Schema}
       */
      value: function (name) {
        var self = this;
        if (!self.can(name))
          throw new Error('Schema with the name ' + name + ' has not been registered');
        return _reg[name];
      },
      enumerable: true,
      configurable: false
    }

  });

  Object.defineProperties(this, {

    schemas: {
      /**
       * Schemas
       */
      value: _schemas,
      enumerable: true,
      configurable: false
    },

    can: {
      /**
       * Determines if a schema is defined and can be instantiated
       * @param name
       * @returns {*}
       */
      value: function (name) {
        return this.schemas.can(name);
      },
      enumerable: true,
      configurable: false
    },

    create: {
      /**
       * Creates a new object or type based on the a previously registered schema
       * @param name - the name given to the schema
       * @param {Object} defaults - any overridden values for an object
       * @returns {Any}
       */
      value: function (name, defaults) {
        var self = this;
        if (!self.can(name))
          throw new ObjectifyError('Schema for ' + name + ' is not registered nor found');
        return self.schemas.get(name).createInstance(defaults);
      },
      enumerable: true,
      configurable: false
    }
  });

  // Setup basic schema types and merge them with the registrations
  _.merge(_reg, BASIC_TYPES);

}

exports = module.exports = new Objectify();

exports.Schema = Schema;

exports.types = {
  basic: BASIC_TYPES
}