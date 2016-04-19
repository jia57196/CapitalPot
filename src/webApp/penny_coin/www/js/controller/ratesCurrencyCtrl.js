

angular.module('ionicApp.controllers')

.controller('CurrenciesController', function ($scope, Currencies) {
  $scope.currencies = Currencies;
  $scope.state = {
    reordering: false
  };

  $scope.$on('$stateChangeStart', function () {
    $scope.state.reordering = false;
    console.log('rates currency is loaded');
  });

  $scope.move = function(currency, fromIndex, toIndex) {
    $scope.currencies.splice(fromIndex, 1);
    $scope.currencies.splice(toIndex, 0, currency);
  };
});
