'use strict';

var expect = require('expect.js'),
    objectify = require('../'),
    validator = objectify.config.validator;

describe('Validator', function () {
    beforeEach(function () {
        expect(objectify).to.be.ok();
        expect(validator).to.be.ok();
    });

    describe("methods", function () {
        describe("#validate()", function () {
            it('should have a validate function', function () {
                expect(validator.validate).to.be.ok();
                expect(validator.validate).to.be.a.func;
            });
        });
    });
});
