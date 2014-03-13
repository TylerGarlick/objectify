'use strict';

var Factory = require('../lib/factory');
var Stereotype = require('../lib/stereotype');


describe('Factory', function () {
  var factory;
  before(function () {
    factory = new Factory();
    factory.should.be.ok;
    factory.create.should.be.a.func;
  });

  describe('#create(stereotype, options)', function () {
    it('should be able to create an object with simple types', function () {
      var person = new Stereotype({
        name: { type: 'string', required: true },
        age: { type: 'number' }
      });
      person.should.be.ok;

      var bob = factory.create(person);
//      bob.name.should.be.equal('');
//      bob.should.be.ok;
    });
  });
});