var expect = require('expect.js')
  , _ = require('lodash')
  , Objectify = require('../')
  ;

describe('Objectify', function () {
  var objectify = new Objectify();
  it('should have a create method', function () {
    expect(_.isFunction(Objectify.create)).to.be(true);
  });

  describe('create()', function () {
    describe('the schema parameter', function () {
      it('should be a string', function () {
        Objectify.create('./test/schemas/personSchema.json');
      });

      it('should be an object', function () {
        Objectify.create({});
      });
    });

    describe('schema: type#object', function () {
      describe('Person Schema', function () {
        var personSchema = require('./schemas/personSchema.json');
        expect(personSchema).to.be.ok();

        it('should be type object', function () {
          expect(personSchema.type).to.be('object');
        });

        it('should return an object', function () {
          var result = Objectify.create(personSchema);
          expect(personSchema.type).to.be('object');
          _.isObject(result);
        });
      });
    });
  });
});