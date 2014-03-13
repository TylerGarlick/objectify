'use strict';

var objectify = require('../'),
  Schema = objectify.Schema,

  _ = require('lodash');

describe('Objectify', function () {

  beforeEach(function () {
    objectify.schemas.clear();
    objectify.schemas.all.should.be.eql(objectify.types.basic);
  });

  describe('schemas', function () {
    it('should have a schema property', function () {
      objectify.should.be.ok;
      objectify.schemas.should.be.ok;
    });

    describe('all', function () {
      it('should be empty by default', function () {
        objectify.schemas.all.should.be.eql(objectify.types.basic);
      });
    });

    describe('removeAll', function () {
      it('should remove all except default schemas', function () {
        objectify.schemas.clear();
        objectify.schemas.all.should.be.eql(objectify.types.basic);
      });
    });

    describe('register', function () {
      it('should require a name and a schema', function () {

        (function () {
          objectify.schemas.register();
        }).should.throw('Name is required');

        (function () {
          objectify.schemas.register('bad');
        }).should.throw(/Schema/);

        (function () {
          objectify.schemas.register('bad', {});
        }).should.throw(/Schema/);

        var person = new Schema({
          name: { type: 'string', default: 'Me Name'},
          age: { type: 'number', max: 99, min: 0}
        });

        objectify.schemas.register('person', person);
        var schemas = objectify.schemas.all;
        _.has(schemas, 'person').should.be.true;

        (function () {
          objectify.schemas.register('person', person);
        }).should.throw(/A type/);

        objectify.schemas.register('person2', person);
        schemas = objectify.schemas.all;
        _.has(schemas, 'person2').should.be.true;
      });

      it('should be able to register a uniquely named schema', function () {
        var person = new Schema({
          name: { type: 'string', default: 'Me Name'},
          age: { type: 'number', max: 99, min: 0}
        });
        console.log(person);
        objectify.schemas.register('person', person);
        var schemas = objectify.schemas.all;
        _.has(schemas, 'person').should.be.true;
      });
    });

    describe('get', function () {
      it('should be able to get a schema after it has been registered', function () {
        var person = new Schema({
          name: { type: 'string', default: 'Me Name'},
          age: { type: 'number', max: 99, min: 0}
        });
        objectify.schemas.register('person', person);
        var schemas = objectify.schemas.all;
        _.has(schemas, 'person').should.be.true;
        var person2 = objectify.schemas.get('person');
        person2.should.be.ok;
      });
    });
  });

  describe('can', function () {
    it('should return false if a schema is not found', function () {
      objectify.can('blah').should.be.false;
    });
  });

  describe('create', function () {
    it('name should be required', function () {
      (function () {
        objectify.create();
      }).should.throw(/Name is required/);
    });

    describe('simple types', function () {
      describe('string', function () {
        it('should be able to create an empty string', function () {
          var value = objectify.create('string');
          value.should.be.eql("");
        });
        it('should be able to override the default string value', function () {
          var value = objectify.create('string', 'Me String');
          value.should.be.eql('Me String');
        });
      });

      describe('number', function () {
        it('should be 0 by default', function () {
          var value = objectify.create('number');
          value.should.eql(0);
        });

        it('should be able to override the default string value', function () {
          var value = objectify.create('number', -1);
          value.should.be.eql(-1);

          value = objectify.create('number', 1000);
          value.should.be.eql(1000);
        });
      });

      describe('array', function () {
        it('should be [] by default', function () {
          var value = objectify.create('array');
          value.should.eql([]);
          value.length.should.eql(0);
        });

        it('should be able to override the default string value', function () {
          var value = objectify.create('array', [4, 4, 4]);
          value.should.be.eql([4, 4, 4]);

          value = objectify.create('array', [1, 2, 3]);
          value.should.eql([1, 2, 3]);
        });
      });

      describe('object', function () {
        it('should be {} by default', function () {
          var value = objectify.create('object');
          value.should.eql({});
        });

        it('should be able to override the default string value', function () {
          var value = objectify.create('object', {first: 'bob', last: 'the builder'});
          value.should.eql({first: 'bob', last: 'the builder'});

          value = objectify.create('array', [1, 2, 3]);
          value.should.eql([1, 2, 3]);
        });
      });
    });

  });
});
