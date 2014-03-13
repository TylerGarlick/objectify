'use strict';
var Stereotype = require('../lib/stereotype');
var util = require('util');

describe('Stereotype', function () {
  describe('Constructor', function () {
    it('should create properties for each key in an object', function () {
      var basic = new Stereotype({
        name: { type: 'string', required: true}
      });
      console.log(basic);
      console.log(util.inspect(basic.properties['name'].validations.all));

      basic.should.be.ok;
    });
  });
});
