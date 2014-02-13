'use strict';

var _ = require('lodash'),
    _s = require('underscore.string');

module.exports = {
    strings: {
        toKey: function (name) {
            var sanitized = _s.camelize(name.toString());
            if (sanitized.length > 0) {
                var chars = sanitized.split('');
                chars[0] = chars[0].toLowerCase();
                sanitized = chars.join('');
            }
            return sanitized;
        }
    }
};
