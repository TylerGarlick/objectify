"use strict";

var Schema = require('validate');

/**
 * An object's stereotypical definition
 *
 * @param {Object} definition
 * @param {Object} [options]
 * @param {Boolean} [options.typecast] - defaults to true
 * @constructor
 */
function Stereotype(definition, options) {
  options = options || { typecast: true };
  if (!definition) {
    throw new Error('Stereotype definition is required.');
  }
  this.definition = new Schema(definition, options);
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
