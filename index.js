var _ = require('lodash')
  , dbc = require('dbc.js')
  , Cocktail = require('cocktail')
  ;

function Objectify() {
}


Cocktail.mix(Objectify, {
  '@exports': module
});


Objectify.build = function (schema, defaults) {
  var self = this;

  if (_.isObject(schema)) {
    dbc([typeof schema === 'object'], 'Schema type is required');
    createObjectOfType(schema.type);

  } else if (_.isString(schema)) {

    var schemaFromPath = require(schema);
    if (schemaFromPath == null || schemaFromPath.length === 0) {
      throw new Error('Schema path is wrong');
    }

  } else {
    throw new Error('Schema must be a string or an object');
  }
};

function createObjectOfType(type) {
  type = type.toLowerCase() || 'object';
  if (type === 'object')
    return {};
  else if (type === 'boolean')
    return false;
  else if (type === 'string')
    return ''
  else if (type === 'number') {
    return 0;
  } else if (type === 'array') {
    return []
  } else if (type === 'regex') {
    return /\*/;
  } else if (type === 'function') {
    return function () {
    };
  } else if (type === 'undefined') {
    return undefined;
  } else if (type === 'null') {
    return null;
  }
}


module.exports = Objectify;