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
        });
    })

    describe('Types', function () {
        describe('Stereotype', function () {
            it('should exists as a prototypal function', function () {
                expect(Types.Stereotype).to.be.a.func;
                var kind = new Types.Stereotype({});
                expect(kind).to.be.ok();
                expect(kind).to.be.a(Types.Stereotype);
            });
        });

        describe('ObjectMetadata', function () {
            it('should exists as a prototypal function', function () {
                expect(Types.ObjectMetadata).to.be.a.func;
                var metadata = new Types.ObjectMetadata('special', {});
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
                console.log(metadata.type);
                expect(metadata.type).to.equal('meSpecialType');

            });
        });
    });


});
