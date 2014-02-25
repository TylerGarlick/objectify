"use strict";
var objectify = require('../../')
	, expect = require('expect.js')
	;

describe('Objectify Api', function () {

	describe('Api Functions', function () {

		describe('#create(spec, defaults)', function () {

			it('should have a create() function', function () {
				expect(objectify.create({})).to.be.a.func;
			});

			it('should require a schema object', function () {
				expect(function () {
					objectify.create();
				}).to.throwError(/Schema is required/);
			});

		});

		describe('#validate(obj, spec)', function () {

			it('should validate an empty object and an empty spec', function(){
				expect(objectify.validate({}, {})).to.be.ok();
			});

			it('should require a schema', function () {

				expect(function(){
					objectify.validate({}, null);
				}).to.throwError(/Schema is required/);

			});
		});

		describe('#register(spec, defaults)', function(){
			it('should be able to register a spec', function(){

			});
		});
	});

	describe('Types', function(){

		expect(objectify.Schema).to.be.a.func;
	});
});