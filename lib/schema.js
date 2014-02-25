"use strict";

function Schema(params) {
	params = params || {};
	this.name = params.name;
	this.definition = {
		type: 'object',
		properties: params.definition
	};
}

Object.defineProperties(Schema.prototype, {
	name: {
		enumerable: true,
		configurable: false,
		writable: true
	},
	definition: {
		enumerable: true,
		configurable: false,
		writable: true
	}
});

exports = module.exports = Schema;