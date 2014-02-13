'use strict';

var _ = require('lodash'),
    helpers = require('./helpers'),
    ObjectMetadata = require('./metadata');

module.exports = new Factory();

function Factory() {
    var types = {
        object: new ObjectMetadata('object', { default: {}, validates: true }),
        boolean: new ObjectMetadata('boolean', { default: false, validates: true }),
        string: new ObjectMetadata('strings', { default: "", validates: true }),
        numeric: new ObjectMetadata('numeric', { default: 0, validates: true }),
        date: new ObjectMetadata('date', {default: new Date(), validates: true }),
        array: new ObjectMetadata('array', { default: [], validates: true }),
        "function": new ObjectMetadata('function', { default: (function () {}), validates: true}),
        custom: []
    };
    _.assign(Factory.types, types);
}

var _types = {};
/**
 * Register type
 * @param {string} name
 * @param {object} [options]
 */
var register = function (name, options) {
    dbc([name && name.length > 0], "Name is required");
    var key = helpers.strings.toKey(name);
    if (!_.has(Factory.types, key) && !_.has(Factory.types.custom, key))
        Factory.types.custom[key] = new ObjectMetadata(name, options);
};

/**
 * Determines if type is registered
 * @param {string} name
 * @return boolean
 */
var can = function (name) {
    dbc([name && name.length > 0], 'Type is required');
    var key = helpers.strings.toKey(name);
    return _.has(Factory.types, key) || _.has(Factory.types.custom[key]);
};

/**
 * Get ObjectMetadata by name
 * @param {string} name
 * @returns {*}
 */
var get = function (name) {
    var self = this;
    if (self.can(name)) {
        var key;
        return Factory.types[key] || Factory.types.custom[key];
    }
}

Object.defineProperties(_types, {
    all: {enumerable: true, configurable: false, value: Factory.types },
    can: { enumerable: true, configurable: false, value: can },
    register: { enumerable: true, configurable: false, value: register },
    get: { enumerable: true, configurable: false, value: get }
});

/**
 * Create object from stereotype
 * @param {Stereotype} stereotype
 * @param {object} defaults
 */
var create = function (stereotype, defaults) {
    var self = this;
    defaults = defaults || {};
    var instance = {};
    var keys = _.keys(stereotype);
    _.forEach(keys, function (key) {
        var meta = stereotype[key];
        var type = meta.type;
        if (type && type.length > 0 && self.types.can(type)) {
            if (defaults[key]) {
                instance[key] = defaults[keys];
            } else {
                var instanceOfType = self.get(type);
                if (instanceOfType != null && instance.default) {
                    instance[key] = instance.default;
                }
            }
        }
    });
    return instance;
};
Object.defineProperties(Factory.prototype, {
    types: { enumerable: true, configurable: false, value: _types },
    create: { enumerable: true, configurable: false, value: create }
});

//Static
Object.defineProperties(Factory, {
    types: { enumerable: false, configurable: false, value: {} }
});
