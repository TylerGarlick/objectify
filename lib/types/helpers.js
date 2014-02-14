'use strict';

var _string = require('underscore.string');

module.exports = {
  strings: {
    toKey: function (name) {
      var sanitized = _string.camelize(name.toString())
        , chars = sanitized.split('');
      chars[0] = chars[0].toLowerCase();
      sanitized = chars.join('');
      return sanitized;
    }
  }
};
