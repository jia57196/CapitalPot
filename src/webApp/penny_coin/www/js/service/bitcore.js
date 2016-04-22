'use strict'

angular.module('ionicApp.services')

.factory('Bitcore', function() {
  var bitcore = require('bitcore');
  return bitcore;
});
