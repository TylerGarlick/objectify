'use strict';

var expect = require('expect.js')
  , Factory = require('../lib/factory')
  , _ = require('lodash')
  ;

describe('Factory', function () {

  describe('#build(kind, override)', function () {

    describe('for object: ', function () {

      it('should build an object by default', function () {
        var result = Factory.createFromKind();
        expect(result).to.be.ok();
        expect(_.keys(result).length).to.be(0);
      });

      it('should build an object if object is specified as kind', function () {
        var result = Factory.createFromKind('object');
        expect(result).to.be.ok();
        expect(_.keys(result).length).to.be(0);
      });

      it('should override default if override is passed', function () {
        var result = Factory.createFromKind('object', {one: 1, two: 2});
        expect(result).to.be.ok();
        expect(_.keys(result).length).to.be(2);
      })


      it('should return a boolean when default is called', function () {
        var result = Factory.createFromKind('object');
        expect(result).to.be.an('object');
      });

      it('should return a boolean when overriden value is called', function () {
        var result = Factory.createFromKind('object', { hello: 'World'});
        expect(result).to.be.an('object');
      });

    });

    describe('for boolean: ', function () {

      it('should return false by default', function () {
        var result = Factory.createFromKind('boolean');
        expect(result).to.not.be.ok();
      });

      it('should be able to be overridden', function () {
        var result = Factory.createFromKind('boolean', true);
        expect(result).to.be.ok();
      });

      it('should return a boolean when default is called', function () {
        var result = Factory.createFromKind('boolean');
        expect(result).to.be.an('boolean');
      });

      it('should return a boolean when overriden value is called', function () {
        var result = Factory.createFromKind('boolean', true);
        expect(result).to.be.an('boolean');
      });

    });


    describe('for string: ', function () {

      it('should return empty by default', function () {
        var result = Factory.createFromKind('string');
        expect(result.length).to.be(0);
      });

      it('should be able to be overridden', function () {
        var result = Factory.createFromKind('string', 'hola mis amigos');
        expect(result).to.be('hola mis amigos');
      });

      it('should return a string when default is called', function () {
        var result = Factory.createFromKind('string');
        expect(result).to.be.an('string');
      });

      it('should return a string when overriden value is called', function () {
        var result = Factory.createFromKind('string', 'boo');
        expect(result).to.be.an('string');
      });

    });

    describe('for number', function () {

      it('should return 0 by default', function () {
        var result = Factory.createFromKind('number');
        expect(result).to.be(0);
      });

      it('should be able to be overridden', function () {
        var result = Factory.createFromKind('number', -1);
        expect(result).to.be(-1);
      });


      it('should return a number when default is called', function () {
        var result = Factory.createFromKind('number');
        expect(result).to.be.an('number');
      });

      it('should return a number when overriden value is called', function () {
        var result = Factory.createFromKind('number', 25);
        expect(result).to.be.an('number');
      });

    });


    describe('for array', function () {

      it('should be empty by default', function () {
        var result = Factory.createFromKind('array');
        expect(result).to.be.empty();
      });


      it('should be able to be overridden', function () {
        var result = Factory.createFromKind('array', [1, 2, 3]);
        expect(result).to.not.be.empty();

      });


      it('should return an array when default is called', function () {
        var result = Factory.createFromKind('array');
        expect(result).to.be.an('array');
      });

      it('should return an array when overriden value is called', function () {
        var result = Factory.createFromKind('array', [1, 2, 3]);
        expect(result).to.be.an('array');
      });

    });


    describe('for unknown type', function () {

      it('should throw an error with unknown type and no default', function () {

        expect(function () {
          var result = Factory.createFromKind('billy');
        }).to.throwError();

      });

      it('should throw an error with unknown type and defaults', function () {

        expect(function () {
          var result = Factory.createFromKind('billy', 'blah');
        }).to.throwError();

      });

    });


  });
});