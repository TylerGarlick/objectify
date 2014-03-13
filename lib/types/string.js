//'use strict';
//
//var Type = require('./type');
//var util = require('util');
//var _ = require('lodash');
//
//function String(defaultValue, options) {
//  options = options || {};
//  String.super_.call(this, 'string', defaultValue);
//
//  if (options.minLength) {
//    this._validations.add('minLength', 'Value must be greater than' + options.minLength, function (value) {
//      return value.length >= options.minLength;
//    });
//  }
//
//  if (options.maxLength) {
//    this._validations.add('maxLength', 'Value must be less than' + options.maxLength, function (value) {
//      return value.length < options.maxLength;
//    });
//  }
//  this.required = options.required || false;
//}
//
//String.is = function (value) {
//  return (value instanceof String) || _.isString(value);
//};
//
//util.inherits(String, Type);
//exports = module.exports = String;