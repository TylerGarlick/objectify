var _ = require('lodash')
  , dbc = require('dbc.js')
  ;

function Objectify() {
}

Objectify.create = function (schema, defaults) {
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
  if (type === 'object')
    return {};
}


module.exports = Objectify;