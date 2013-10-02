var _ = require('lodash')
  , dbc = require('dbc.js')
  ;

function Objectify() {
  this.createObjectOfType = function (type) {
    if (type === 'object')
      return {};
  }
}

Objectify.prototype.create = function (schema, defaults) {
  var self = this;
  if (_.isObject(schema)) {
//    dbc([schema.type === 'object'], 'Schema type is required');
    return self.createObjectOfType(schema.type);
  } else if (_.isString(schema)) {
    var schemaFromPath = require(schema);
    if (schemaFromPath == null || schemaFromPath.length === 0) {
      throw new Error('Schema path is wrong');
    }
  } else {
    throw new Error('Schema must be a string or an object');
  }
};


module.exports = Objectify;