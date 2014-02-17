'use strict';

var dbc = require('dbc.js'),
  helpers = require('./helpers');


/**
 * Object ObjectMetadata
 * @constructor
 * @param {string} name
 * @param {object} params
 * @param {*} [params.default]
 * @param {boolean} [params.canValidate]
 * @param {string} [params.inheritsFromType]
 */
function ObjectMetadata(name, params) {
  dbc([name && name.length > 0], "Name is required");
  params = params || {};
  this.type = helpers.strings.sanitize(name);
  this.default = params.default;
  this.inheritsFromType = params.inheritsFromType;
  this.validationRules = params.validationRules;
}

module.exports = ObjectMetadata;


Object.defineProperties(ObjectMetadata.prototype, {
  type: { enumerable: true, configurable: false, writable: true },
  default: { enumerable: true, configurable: false, writable: true },
  canValidate: { enumerable: true, configurable: false, get: function () { return this.validationRules && this.validationRules.length > 0;}},
  inheritsFromType: { enumerable: true, configurable: false, writable: true },
  validationRules: { enumerable: true, configurable: false, writable: true }
});