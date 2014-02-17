'use strict';

var _ = require('lodash'),
  validator = require('./validations'),
  factory = require('./types/factory'),
  version = require('../package.json').version,
  ioc = require('minioc');

module.exports = new Objectify();

/**
 * Build objects from a stereotype object
 * @constructor
 */
function Objectify() { }

/**
 * Create a new object
 * @param {Stereotype} stereotype
 * @param {object} [defaults]
 * @return {object}
 */
var create = function (stereotype, defaults) {
  return factory.create(stereotype, defaults);
};

var types = {};
Object.defineProperties(types, {
  Stereotype: {enumerable: true, configurable: false, value: require('./types/stereotype')},
  ObjectMetadata: {enumerable: true, configurable: false, value: require('./types/metadata')}
});

Object.defineProperties(Objectify.prototype, {
  config: { enumerable: true, configurable: false,
    value: {
      factory: factory,
      validator: validator,
      version: version,
      ioc: ioc
    }
  },
  Types: {enumerable: true, configurable: false, value: types },
  create: {enumerable: true, configurable: false, value: create },
  validate: {enumerable: true, configurable: false, value: true }
});

Object.defineProperties(Objectify, {
  ioc: { enumerable: false, configurable: false, value: ioc }
});