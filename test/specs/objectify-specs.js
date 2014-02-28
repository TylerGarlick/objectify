"use strict";
var objectify = require('../../');

describe('Objectify', function () {
	describe('Functions', function () {
		describe('#create(spec, defaults)', function () {
			it('should have a create() function', function () {
				objectify.create.should.be.a.Function;
			});
			it('should require a schema object', function () {
				(function () {
					objectify.create();
				}).should.throw();
			});
		});

		describe('#validate(obj, spec)', function () {
			it('should validate an empty object and an empty spec', function () {
				var result = objectify.validate({}, {});
				result.should.be.true;
			});
			it('should require a schema', function () {
				(function () {
					objectify.validate({}, null);
				}).should.throw();
			});
		});
	});

	describe('Properties', function () {
		describe('stereotypes', function () {
			describe('all', function () {
				it('should have no registrations by default', function () {
					objectify.stereotypes.all().should.be.empty;
				});
			});
		});
	});

	describe('Types', function () {
		objectify.Schema.should.be.a.Function;
	});
});