"use strict";

var _ = require('lodash');
var Property = require('./property');

/**
 * An object's stereotypical definition
 *
 * @param {Object} obj
 * @param {Object} [options]
 * @param {Boolean} [options.typecast] - defaults to true
 * @constructor
 */
function Stereotype(obj, options) {
  var self = this;
  obj = obj || {};
  options = options || { typecast: true };
  this.properties = {};

  _.forEach(_.keys(obj), function (key) {
    var property = self.properties[key] || new Property(obj[key]);
    self.properties[key] = property;
  });
}


Object.defineProperties(Stereotype.prototype, {
  /**
   * The stereotypical definition
   */
  definition: {
    enumerable: true,
    configurable: false,
    writable: true
  },
  path: {
    value: function (path, rules) {
      var self = this;
      var property = self.properties[path] || new Property(path);
      self.properties[path] = property;
    },
    enumerable: true,
    configurable: false
  },
  /**
   * The properties and metadata of a stereotype
   */
  properties: {
    enumerable: true,
    configurable: false,
    writable: true
  },
  /**
   * Validates an instance of an object against the Stereotypical type
   *
   * @param {Object} [options]
   * @param {Boolean} [options.typecast] - defaults to true
   * @returns {Object}
   */
  validate: {
    value: function (instance, options) {
      var self = this;
      options = options || { typecast: true };
      if (!instance) {
        throw new Error('An instance is required.');
      }

      var errors = [];
      _.forEach(_.keys(self.properties), function (key) {
        var property = self.properties[key];
        if (_.has(instance, key)) {

        }
      });

      var result = self.definition.validate(instance, options);
      return {
        valid: result.errors.length == 0,
        errors: result.errors,
        instance: result.accepted
      }
    },
    enumerable: true,
    configurable: false
  }
});

module.exports = Stereotype;
