'use strict';

var Cocktail = require('cocktail')
  , _ = require('lodash')
  , dbc = require('dbc.js')
  , Factory = require('./factory')
  , validate = require('json-schema').validate;
;

Cocktail.mix({
  '@exports': module,
  '@as': 'class',
  '@static': {
    build: function (schema, overrides) {
      var self = this;

      dbc([schema], "A valid schema is required");
      dbc([_.isObject(schema) || _.isString(schema)], "Schema must be a json path or an object");

      if (overrides) {
        dbc(_.isObject(overrides), "Overrides must be an object");
      }

      var jsonSchema = schema;
      if (_.isString(schema)) {
        jsonSchema = require(schema);
      }

      if (jsonSchema.type &&
        jsonSchema.type.toLowerCase() === 'object') {

        var instance = Factory.createFromKind(jsonSchema.type);
        self._addPropertiesToInstanceFromSchema(jsonSchema.properties, instance);
        self._setDefaults(instance, overrides);

        console.log(instance);
        return instance;
      }
    },
    validate: function (instance, schema) {
      validate(instance, schema);
    },
    _addPropertiesToInstanceFromSchema: function (properites, instance) {
      _.forEach(_.keys(properites), function (key) {
        var kind = properites[key].type;
        instance[key] = Factory.createFromKind(kind);
      });
    },
    _setDefaults: function (instance, overrides) {
      _.forEach(_.keys(instance), function (key) {
        if (overrides && overrides[key]) {
          instance[key] = overrides[key];
        }
      });
    }
  }
});