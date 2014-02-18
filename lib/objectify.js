'use strict';

var _ = require('lodash'),
    validator = require('./validations'),
    factory = require('./types/factory'),
    version = require('../package.json').version,
    dbc = require('dbc.js'),
    ioc = require('minioc');

Object.defineProperties(Objectify, {
    ioc: { enumerable: false, configurable: false, value: ioc }
});

module.exports = new Objectify();

/**
 * Build objects from a stereotype object
 * @constructor
 */
function Objectify() {
}

/**
 * Create a new object
 * @param {Stereotype} stereotype
 * @param {object} [defaults]
 * @return {object}
 */
var create = function (stereotype, defaults) {
    return factory.create(stereotype, defaults);
};

var types = {};
Object.defineProperties(types, {
    Stereotype: {enumerable: true, configurable: false, value: require('./types/stereotype')},
    ObjectMetadata: {enumerable: true, configurable: false, value: require('./types/metadata')}
});

var stereotypes = {};
Object.defineProperties(stereotypes, {
    /**
     * Register Stereotype
     *
     */
    register: {enumerable: true, configurable: false,
        value: function (stereotype) {
            dbc([stereotype], 'Stereotype is required');
            var stereotypes = Objectify.ioc.get('stereotypes');
            if (Objectify.ioc.has(stereotype.name)) {
            }
        }},
    get: { enumerable: true, configurable: false,
        value: function (name) {
            var self = this;
            if (self.config.ioc.can(name)) {
                return self.config.ioc.get(name);
            } else {
                throw new Error('Stereotype not register with name ' + name);
            }
        }
    },
    remove: { enumerable: true, configurable: false,
        value: function (name) {
            var self = this;
            if (self.config.ioc.can(name))
                self.config.ioc.unregister(name);
            else
                throw new Error('Stereotype not found with name ' + name);
        }
    }
});

Object.defineProperties(Objectify.prototype, {
    config: { enumerable: true, configurable: false,
        value: {
            factory: factory,
            validator: validator,
            version: version,
            ioc: ioc
        }
    },
    Types: {enumerable: true, configurable: false, value: types },
    create: {enumerable: true, configurable: false, value: create },
    validate: {enumerable: true, configurable: false, value: true },
    stereotypes: {enumerable: true, configurable: false, value: stereotypes }
});

