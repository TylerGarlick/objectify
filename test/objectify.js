'use strict';

var expect = require('expect.js'),
  objectify = require('../'),
  Types = objectify.Types,
  version = require('../package.json').version;


describe('Objectify', function () {

  beforeEach(function () {
    expect(objectify).to.be.ok();
  });

  describe('config', function () {
    describe('properties', function () {
      describe('#version', function () {
        it('should have the same version as the package', function () {
          expect(objectify.config.version).to.eql(version);
        });
      });

      describe('#ioc', function () {
        it('should have an ioc container by default', function () {
          expect(objectify.config.ioc).to.be.ok();
        });
      });
    });
  });

  describe('Types', function () {
    describe('Stereotype', function () {
      it('should exists as a prototypal function', function () {
        var kind = new Types.Stereotype({});
        expect(Types.Stereotype).to.be.a.func;
        expect(kind).to.be.ok();
        expect(kind).to.be.a(Types.Stereotype);
      });
    });

    describe('ObjectMetadata', function () {
      it('should exists as a prototypal function', function () {
        var metadata = new Types.ObjectMetadata('special', {});
        expect(Types.ObjectMetadata).to.be.a.func;
        expect(metadata).to.be.ok();
        expect(metadata).to.be.a(Types.ObjectMetadata);
      });

      it('should require a name', function () {
        expect(function () {
          new Types.ObjectMetadata();
        }).to.throwError;
      });

      it('should make the name the type formatted', function () {
        var metadata = new Types.ObjectMetadata("MeSpecialType");
        expect(metadata).to.be.ok();
        expect(metadata.type).to.equal('mespecialtype');
      });
    });
  });

});
