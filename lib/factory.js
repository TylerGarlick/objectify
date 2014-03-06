'use strict';

var _ = require('lodash');

function Factory(types) {
  var self = this;
  self.types = types || {};
  self.knownTypes = ['string', 'number', 'boolean', 'object', 'array'];
  _.forEach(_.keys(self.types), function (type) {
    self.knownTypes.push(type.toLowerCase());
  });
}


Factory.prototype.create = function (stereotype, property, options) {
  var self = this
  property = property || {};
  options = options || {};
  var instance = {};


};

Factory.prototype._createProperty = function (type, property, options) {
  var self = this;
  options = options || { errorOnUnknownType: true };
  type = type ? type.toLowerCase() : null;


  if (!self._isKnownType(type, property)) {
    if (options.errorOnUnknownType)
      throw new Error('Unknown Type ' + type);
  }

  if (options.default) {
    return options.default;
  }

  switch (type) {
    case 'string' :
      break;

  }


  if (type === 'string') {
    if (options.default) {
      return options.default;
    } else {

    }
  }

  if (type === 'number') {
    if (options.default) {
      return options.default;
    } else {
      return 0;
    }
  }

  if (type === 'object') {
    if (options.default) {
      return options.default;
    } else {
      return {};
    }
  }

  if (type === 'array') {
    if (options.default) {
      return options.default;
    } else {
      return [];
    }
  }

  if (type === 'boolean') {
    if (options.default) {
      return options.default;
    } else {
      return {};
    }
  }


};


/**
 * Determine if the type is know to the system
 * @param {String} type
 * @param {Object} property
 */
Factory.prototype._isKnownType = function (type, property) {
  var self = this;
  type = type.toLowerCase() || null;

  return type && type.length > 0 && _.some(type, self.knownTypes);
};

module.exports = Factory;