'use strict';

var _string = require('underscore.string');

module.exports = {
  strings: {
    sanitize: function (name) {
      var sanitized = _string.clean(name).toLowerCase();
      return _string.dasherize(sanitized);
    }
  }
};
