'use strict';

var expect = require('expect.js')
  , Objectify = require('../lib/objectify')
  , _ = require('lodash')
  ;


describe('Objectify', function () {
  describe('#build(schema, overrides)', function () {

    it('should require schema', function () {
      expect(function () {
        Objectify.build(null);
      }).to.throwError();
    });

    it('should be able to load a valid json schema from string', function () {
      var result = Objectify.build('../test/schemas/personSchema.json');
      expect(result).to.be.ok();
    });

    it('should be able to set a default property', function () {
      var result = Objectify.build('../test/schemas/personSchema.json', {firstName: 'Billy'});
      expect(result.firstName).to.be('Billy');
    });

    it('should be able to load a valid json schema from an object', function () {
      var schema = require('../test/schemas/personSchema.json');
      var result = Objectify.build(schema, {lastName: 'Bob'});
      expect(result).to.be.ok();
      expect(result.lastName).to.be('Bob');
    });

  });


  describe('#validate(instance, schema)', function () {
    it('should return true given a valid schema and instance', function () {
      var schema = require('../test/schemas/personSchema.json');
      var result = Objectify.build(schema, {firstName: 'Billy', lastName: 'Bob', age: 2});

      console.log(schema);
      console.log(result);

      expect(Objectify.validate(result, schema)).to.be.ok();

    });
  });
});