'use strict';

var Cocktail = require('cocktail')
  , _ = require('lodash')
  ;

Cocktail.mix({
  '@exports': module,
  '@as': 'class',
  '@static': {
    createFromKind: function (kind, override) {
      kind = kind || 'object';
      kind = kind.toLowerCase();

      if (kind === 'object') {
        if (_.isObject(override)) {
          return override;
        } else {
          return {};
        }
      } else if (kind === 'boolean') {
        if (_.isBoolean(override)) {
          return override;
        } else {
          return false;
        }
      } else if (kind === 'string') {
        if (_.isString(override)) {
          return override;
        } else {
          return '';
        }
      } else if (kind === 'number') {
        if (_.isNumber(override)) {
          return override;
        } else {
          return 0;
        }
      } else if (kind === 'integer') {
        if (_.isNumber(override)) {
          return override;
        } else {
          return 0;
        }
      } else if (kind === 'array') {
        if (_.isArray(override)) {
          return override;
        } else {
          return [];
        }
      } else {
        throw new Error("Object Factory couldn't build an object of kind " + kind);
      }
    }
  }
});