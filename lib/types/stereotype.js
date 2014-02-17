'use strict';

var dbc = require('dbc.js')
  , _ = require('lodash')
  ;


module.exports = Stereotype;

/**
 * Stereotype
 * @param {object} definition
 * @param {object} [options]
 * @constructor
 *
 */
function Stereotype(definition, options) {
  options = options || {};
  dbc([definition], "Stereotype definition is required");

  Object.defineProperties(this, {
    definition: { enumerable: true, configurable: false, value: definition }
  });
}

