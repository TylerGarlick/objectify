"use strict";

var objectify = require('../../index')
	, expect = require('expect.js')
	;

describe('Object.create', function(){

	it('simple types should validate', function(){
		expect(objectify.validate(4, { type: 'number' })).to.be.ok();
		expect(objectify.validate({}, { type: 'object' })).to.be.ok();
		expect(objectify.validate('me string', { type: 'string' })).to.be.ok();
		expect(objectify.validate(new Date(), { type: 'date' })).to.be.ok();
	});

});

