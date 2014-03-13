'use strict';

var _ = require('lodash');

function Property(options) {
  options = options || {};
  if (options.type) this.type = options.type;
  this.required = options.required ? options.required : false;

//  this._validations = {};
//  this._validations = {};
//  Object.defineProperties(this._validations, {
//    all: {
//      get: function () {
//        var self = this;
//        return self._validations;
//      },
//      enumerable: true
//    },
//    add: {
//      value: function (name, message, fn) {
//        var self = this;
//        var validation = {
//          name: name,
//          message: message,
//          fn: fn
//        };
//        if (!can(name)) {
//          self._validations[name] = validation;
//        } else {
//          throw new Error('Validation with name ' + validation.name + ' is already defined');
//        }
//        return validation;
//      },
//      enumerable: true,
//      configurable: false
//    },
//    update: {
//      value: function (name, message, fn) {
//        var self = this;
//        var validation = {
//          name: name,
//          message: message,
//          fn: fn
//        };
//        if (self._validations.can(name)) {
//          self._validations[name] = validation;
//        } else {
//          throw new Error('Validation with name ' + validation.name + ' is not defined');
//        }
//
//        return validation;
//      },
//      enumerable: true,
//      configurable: false
//    },
//    remove: {
//      value: function (name) {
//        var self = this;
//        if (self._validations.can(name)) {
//          delete self._validations[name];
//        } else {
//          throw new Error('Validation with name ' + name + ' is not defined');
//        }
//      },
//      enumerable: true
//    },
//    can: {
//      value: function (name) {
//        var self = this;
//        return  self._validations.all[name];
//      },
//      enumerable: true,
//      configurable: false
//    }
//  });
}

var _rules = {};
var _validations = {};
Object.defineProperties(_validations, {
  all: {
    get: function () {
      return _rules;
    }
  },
  add: {
    value: function (name, fn, message) {
      var self = this;
      if(!self.validations.can(name)){
        _rules[name] = [];
      }
      if (_rules[name]) {

      } else {

      }

      if (self.validations.can(name))
        throw new Error('There is a validation already defined');
      else
        _rules[name] = [fn]
    },
    enumerable: true,
    configurable: false
  },
  can: {
    /**
     * Is the validation defined?
     * @param name - validation name
     * @returns {Boolean}
     */
    value: function (name) {
      return _.has(_rules, name);
    },
    enumerable: true,
    configurable: false
  }
});


Object.defineProperties(Property.prototype, {
  type: {
    configurable: false,
    writable: true,
    enumerable: true
  },
  required: {
    configurable: false,
    enumerable: true,
    writable: true
  },
  default: {
    configurable: false,
    enumerable: true,
    writable: true
  },
  validations: {
    value: _validations,
    enumerable: true,
    configurable: false
  }
});

/**
 *
 * @param {Mixed} value
 */
Property.prototype.validate = function (value) {

};

module.exports = Property;

