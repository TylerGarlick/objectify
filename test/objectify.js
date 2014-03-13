'use strict';
var objectify = require('../');
var Stereotype = objectify.Stereotype;

describe('objectify', function () {
  describe('_validations', function () {
    describe('#create(stereotype, defaults)', function () {
      it('should be able to create an object with simple types', function () {
        var stereotypicalPerson = new Stereotype({
          name: { type: 'string', required: true },
          age: { type: 'numeric' }
        });
        stereotypicalPerson.should.be.ok;
//        var person = objectify.create(stereotypicalPerson);
//        person.should.be.ok;
      });
    });
  });
});