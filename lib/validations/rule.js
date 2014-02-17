'use strict';

var dbc = require('dbc.js')
  , _ = require('lodash')
  ;

/**
 * Validation Rule
 * @param {function} fn - fn(instance) : {boolean|validationError}
 * @constructor
 */
function ValidationRule(fn, params) {
  params = params || {};
  dbc([fn && _.isFunction(fn)], 'Validation function is required.');
  this.validate = fn;
  this.active = params.active || true;
}

module.exports = ValidationRule;

