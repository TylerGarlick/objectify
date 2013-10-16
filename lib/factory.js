'use strict';

var Cocktail = require('cocktail');

function Factory() {
}

Cocktail.mix(Factory, {
  '@exports': module,
  '@as': 'class',
  '@static': {

  }
});