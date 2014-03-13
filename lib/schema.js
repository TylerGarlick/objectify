'use strict';

var _ = require('lodash'),
  ValidationError = require('./errors').ValidationError;

/**
 * The schema defines a type
 * @param definition
 * @constructor
 */
function Schema(definition, options) {
  options = options || {};
  var simpleType = false;
  if (_.isObject(definition) && _.keys(definition).length > 0)
    _.merge(this, definition);

  if (_.isString(definition))
    simpleType = true;

  Object.defineProperties(this, {
    validations: {
      enumerable: false,
      configurable: false,
      writable: true
    },
    "default": {
      writable: true,
      enumerable: false,
      configurable: false
    },
    isSimpleType: {
      value: simpleType,
      enumerable: false,
      configurable: false
    }
  });

  if (options.validations) {
    if (!_.isArray(options.validations)) {
      this.validations = [options.validations];
    } else {
      this.validations = options.validations;
    }
  }

  if (!_.isNull(options.default)) {
    this.default = options.default;
  }
}

/**
 * Validate an object against a schema
 * @param value - the value to compare to the schema
 * @returns {Array}
 */
Schema.prototype.validate = function (value) {
  var self = this;
  var errors = [];
  _.forEach(self.validations, function (fn) {
    try {
      fn(value);
    } catch (e) {
      errors.push(e);
    }
  });
  return errors;
};

/**
 * Create an instance based on a schema
 * @param [defaults] - any default values that will override any set params
 * @returns {Any}
 */
Schema.prototype.createInstance = function (defaults) {
  var self = this;
  var instance;

  if (self.isSimpleType) {
    instance = self.default;
  } else {
    instance = {}
  }

  if (defaults) {
    if (!_.isObject(defaults))
      instance = defaults;
    else
      _.merge(instance, defaults);
  }
  return instance;
};

exports = module.exports = Schema;
exports.ValidationError = ValidationError;