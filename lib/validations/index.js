'use strict';

var minioc = require('minioc')
  ;

Object.defineProperties(Validator, {
  ioc: { enumerable: false, configurable: false, value: minioc }
});



module.exports = new Validator();

function Validator() {}

/**
 * Validate and object based on the schema
 *
 * @param {object|*} instance
 * @param {Stereotype} stereotype
 *
 * @private
 */
var validate = function (instance, stereotype) {}

Object.defineProperties(Validator.prototype, {
  ioc: {enumerable: false, configurable: false, get: function () {
    return Validator.ioc;
  }},
  validate: { enumerable: true, configurable: false, value: validate }
});
