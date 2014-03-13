var util = require('util');

function ObjectifyError(msg) {
  ObjectifyError.super_.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'ObjectifyError';
}
util.inherits(ObjectifyError, Error);

function ValidationError(msg, value) {
  ValidationError.super_.call(this, msg);
  this.name = 'ValidationError';
  this.value = value;
}
util.inherits(ValidationError, ObjectifyError);


exports = module.exports = ObjectifyError;
exports.ValidationError = ValidationError;