'use strict';

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
var _validate = function (instance, stereotype) {}

Object.defineProperties(Validator.prototype, {
    validate: { enumerable: true, configurable: false, value: _validate }
});
