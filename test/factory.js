'use strict';

var expect = require('expect.js')
  , factory = require('../lib/types/factory')
  , ObjectMetadata = require('../lib/types/metadata')
  ;

describe('Factory', function () {
  beforeEach(function () {
    expect(factory).to.be.ok();
  });

  describe('types', function () {

    it("should have an 'object' registered by default", function () {
      expect(factory._ioc.can('object')).to.be.ok();
    });

    it("should have a 'boolean' registered by default", function () {
      expect(factory._ioc.can('boolean')).to.be.ok();
    });

    it("should have a 'string' registered by default", function () {
      expect(factory._ioc.can('string')).to.be.ok();
    });

    it("should have a 'numeric' registered by default", function () {
      expect(factory._ioc.can('numeric')).to.be.ok();
    });

    it("should have a 'date' registered by default", function () {
      expect(factory._ioc.can('date')).to.be.ok();
    });

    it("should have an 'array' registered by default", function () {
      expect(factory._ioc.can('array')).to.be.ok();
    });

    describe('#register()', function () {
      it("should be able to register a new type", function () {
        factory.types.register("myType", { default: "12345", canValidate: true });
        expect(factory.types.can("myType")).to.be.ok();
      });

      it("should be able to create new type with default", function () {
        var result = factory.create({ name: {type: 'myType'}});
        expect(result).to.be.ok();
        expect(result.name).to.be.equal("12345");
      });

    });

  });

  describe('defaults for types', function () {

    it("should return a {} by default for an 'object'", function () {
      var val = factory.types.get('object');
      expect(val.default).to.be.eql({});
    });

    it("should return false by default for a 'boolean'", function () {
      var val = factory.types.get('boolean');
      expect(val.default).to.be.eql(false);
    });


    it("should return '' by default for a 'string'", function () {
      var val = factory.types.get('string');
      expect(val.default).to.be.eql('');
    });

    it("should return '0' by default for a 'numeric'", function () {
      var val = factory.types.get('numeric');
      expect(val.default).to.be(0);
    });

    it("should return 'date' by default for a 'date", function () {
      var val = factory.types.get('date');
      expect(val.default).to.be.a(Date);
    });


    it("should return a '[]' for an array", function () {
      var val = factory.types.get('array');
      expect(val.default).to.be.eql([]);
    });

  });

  describe('#create(stereotype, defaults)', function () {
    it('should be able to create and with defaults from stereotype', function () {

      var person = factory.create({
        name: { type: 'string' },
        age: {type: 'numeric'}
      });

      expect(person).to.be.ok();
      expect(person.name).to.be.eql('');
      expect(person.age).to.be.eql(0);
    });


    it('should assign defaults from options', function () {

      var person = factory.create({
        name: { type: 'string' },
        age: {type: 'numeric'}
      }, {name: "billy", age: 30});

      expect(person).to.be.ok();
      expect(person.name).to.be.eql('billy');
      expect(person.age).to.be.eql(30);
    });
  });


});