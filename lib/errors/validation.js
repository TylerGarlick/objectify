'use strict';
'use strict';

var util = require('util')
    , BasicError = require('./basic')
    ;

/**
 * Validation error
 * @param {string} name
 * @param {*} [value]
 * @param {string} [msg]
 * @constructor
 */
function ValidationError(name, value, msg) {
    msg = msg || this.toString();
    ValidationError.super_.call(this, msg);

    Object.defineProperties(this, {
        name: { enumerable: true, configurable: false, value: name  },
        value: { enumerable: true, configurable: false, value: value }
    });
}
util.inherits(ValidationError, BasicError);

ValidationError.prototype.toString = function () {
    var self = this;
    return "There was an error on " + self.name + " for " + self.value;
};

/**
 * Type validation error
 * @param {string} typeName
 * @param {string} typeExpecting
 * @param {string} [msg=]
 * @constructor
 */
function ValidationTypeError(typeName, typeExpecting, msg) {
    msg = msg || this.toString();
    ValidationTypeError.super_.call(this, msg);

    Object.defineProperties(this, {
        typeName: { enumerable: true, configurable: false, value: typeName  },
        typeExpecting: { enumerable: true, configurable: false, value: typeExpecting }
    });
}
util.inherits(ValidationTypeError, BasicError);

ValidationTypeError.prototype.toString = function () {
    var self = this;
    return "Type is " + self.typeName + " but was expecting " + self.typeExpecting;
};


module.exports.ValidationError = ValidationError;
module.exports.ValidationTypeError = ValidationTypeError;

