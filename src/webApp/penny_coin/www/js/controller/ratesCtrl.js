

angular.module('ionicApp.controllers')

.controller('RatesCtrl', function ($scope, $http, $ionicPopover, Currencies) {
  
  $scope.currencies = Currencies;

  $scope.load = function () {
    $http.get('https://api.bitcoinaverage.com/ticker/all').success(function (tickers) {
      angular.forEach($scope.currencies, function (currency) {
        currency.ticker = tickers[currency.code];
        currency.ticker.timestamp = new Date(currency.ticker.timestamp);
      });
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
    console.log("rates is loaded.");
  };

  $scope.load();
});