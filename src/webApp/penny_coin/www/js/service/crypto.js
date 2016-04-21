'use strict'

angular.module('ionicApp.services')

.factory('crypto', function() {
  return require('copay').crypto;
});
