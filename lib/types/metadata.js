'use strict';

var dbc = require('dbc.js'),
  helpers = require('./helpers');


/**
 * Object ObjectMetadata
 * @constructor
 * @param {string} name
 * @param {object} params
 * @param {*} [params.default]
 * @param {boolean} [params.validates]
 * @param {string} [params.inheritsFromType]
 */
function ObjectMetadata(name, params) {
  dbc([name && name.length > 0], "Name is required");
  params = params || {};
  this.type = helpers.strings.toKey(name);
  this.default = params.default;
  this.validates = params.validates || true;
  this.inheritsFromType = params.inheritsFromType;
}

module.exports = ObjectMetadata;


Object.defineProperties(ObjectMetadata.prototype, {
  type: { enumerable: true, configurable: false, writable: true },
  default: { enumerable: true, configurable: false, writable: true },
  validates: { enumerable: true, configurable: false, writable: true },
  inheritsFromType: { enumerable: true, configurable: false, writable: true },
  validationRules: { enumerable: true, configurable: false, value: [] }
});