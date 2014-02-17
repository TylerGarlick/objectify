'use strict';

var _ = require('lodash')
  , dbc = require('dbc.js')
  , helpers = require('./helpers')
  , ObjectMetadata = require('./metadata')
  , ioc = require('minioc').root
  , Rule = require('../validations/rule')
  , Errors = require('../errors')
  ;

//Static
Object.defineProperties(Factory, {
  ioc: {enumerable: true, configurable: false, value: ioc },
  types: { enumerable: false, configurable: false,
    get: function () {
      return Factory.ioc.get('types');
    }
  }
});

module.exports = new Factory();

function Factory() {

  var objectValidation = new Rule(function (name, instance, required) {
    var errors = [];
    if (required) {
      if (!_.isObject(instance)) {
        errors.push(new Errors.Validation('object', instance, name + ' is not an object'));
        errors.push(new Errors.Validation('object', instance, name + ' is required'));
      }
    }
    return errors.length > 0 ? errors : true;
  });
  var booleanValidation = new Rule(function (name, instance, required) {
    var errors = [];
    if (required) {
      if (!_.isBoolean(instance)) {
        errors.push(new Errors.Validation('boolean', instance, name + ' is not a boolean'));
        errors.push(new Errors.Validation('boolean', instance, name + ' is required'));
      }

    }

    return errors.length > 0 ? errors : true;
  });

  //simple types
  Factory.ioc.register('object').as.value(new ObjectMetadata('object', { default: {}, validationRules: [objectValidation]}));
  Factory.ioc.register('boolean').as.value(new ObjectMetadata('boolean', { default: false, validationRules: [booleanValidation] }));
  Factory.ioc.register('string').as.value(new ObjectMetadata('string', { default: "", validationRules: [] }));
  Factory.ioc.register('numeric').as.value(new ObjectMetadata('numeric', { default: 0, validationRules: [] }));
  Factory.ioc.register('int').as.value(new ObjectMetadata('int', { default: 0, validationRules: [] }));
  Factory.ioc.register('float').as.value(new ObjectMetadata('float', { default: 0.0, validationRules: [] }));
  Factory.ioc.register('date').as.value(new ObjectMetadata('date', {default: new Date(), validationRules: [] }));
  Factory.ioc.register('array').as.value(new ObjectMetadata('array', { default: [], validationRules: [] }));

}



var _types = {};

/**
 * Register type
 * @param {string} name
 * @param {object} [options]
 */
var register = function (name, options) {
  var key = helpers.strings.sanitize(name);
  dbc([name && name.length > 0], "Name is required");
  if (!Factory.ioc.has(key))
    Factory.ioc.register(key).as.value(new ObjectMetadata(key, options));
  else
    throw new Error("There is an object already registered for " + name);
};

/**
 * Determines if type is registered
 * @param {string} name
 * @return boolean
 */
var can = function (name) {
  var key = helpers.strings.sanitize(name);
  dbc([name && name.length > 0], 'Type is required');
  return Factory.ioc.has(key);
};

/**
 * Get ObjectMetadata by name
 * @param {string} name
 * @returns {*}
 */
var get = function (name) {
  var key = helpers.strings.sanitize(name);
  if (Factory.ioc.can(key)) {
    return Factory.ioc.get(key);
  }
};

var isValid = function (name, instance) {
  var key = helpers.strings.sanitize(name);

  if (Factory.ioc.can(key)) {
    var meta = Factory.ioc.get(key);
    if (meta.canValidate()) {
      _.forEach(meta.validationRules, function (validate) {

      });
    }
  }
};

Object.defineProperties(_types, {
  all: {enumerable: true, configurable: false, value: Factory.types },
  can: { enumerable: true, configurable: false, value: can },
  register: { enumerable: true, configurable: false, value: register },
  get: { enumerable: true, configurable: false, value: get },
  isValid: {enumerable: true, configurable: false, value: isValid }
});

/**
 * Create object from stereotype
 * @param {Stereotype} stereotype
 * @param {object} defaults
 */
var create = function (stereotype, defaults) {
  var self = this
    , instance = {}
    , keys = _.keys(stereotype);

  defaults = defaults || {};

  _.forEach(keys, function (key) {
    var meta = stereotype[key]
      , type = meta.type
      , instanceOfType = self.types.get(type);
    if (type && type.length > 0 && self.types.can(type)) {
      if (_.has(defaults, key)) {
        instance[key] = defaults[key];
      } else {
        instance[key] = instanceOfType.default;
      }
    }
  });
  return instance;
};

Object.defineProperties(Factory.prototype, {
  _ioc: {enumerable: false, configurable: false, value: Factory.ioc },
  types: { enumerable: true, configurable: false, value: _types },
  create: { enumerable: true, configurable: false, value: create }
});
