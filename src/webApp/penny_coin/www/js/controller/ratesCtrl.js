

angular.module('ionicApp.controllers.rates', [])

.controller('RatesCtrl', function ($scope, $http, Currencies) {
  
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
    //console.log("rates is loaded." +  JSON.stringify($scope.currencies));

  };

  $scope.load();
})

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

})

.controller('HistoryController', 
  function ($scope, $http, $state, $stateParams, Currencies) {

  $scope.chart = {
    options: {
      chart: {
        type: 'line'
      },
      legend: {
        enabled: false
      }
    },
    title: {
      text: null
    },
    yAxis: {
      title: null
    },
    xAxis: {
      type: 'datetime'
    },
    series: []
  };

  $scope.history = {
    currency: $stateParams.currency || 'USD'
  };

  $scope.currencies = Currencies;
  
  $scope.changeCurrency = function () {
    //$state.go('app.tab.rates.history', { currency: $scope.history.currency };
    $scope.chart.series.length = 0;
    console.log('To show chart of BTC/' + $scope.history.currency);
    $scope.load();
  };

  $scope.load = function(){

    $http.get('https://api.bitcoinaverage.com/history/' + $scope.history.currency + '/per_hour_monthly_sliding_window.csv').success(function (prices) {

      prices = prices.split(/\n/);
      var series = {
        data: []
      };

      angular.forEach(prices, function (price, index) {
        price = price.split(',');
        var date = new Date(price[0].replace(' ', 'T')).getTime();
        var value = parseFloat(price[3]);
        if (date && value > 0) {
          series.data.push([date, value]);
        }
      });

      $scope.chart.series.push(series);
    });
  };  


  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.history = {
      currency: $stateParams.currency || 'USD'
    };
  });

  $scope.load();

})

.controller('DetailController', function ($scope, $stateParams, $state, Currencies) {

  angular.forEach(Currencies, function (currency) {
    if (currency.code === $stateParams.currency) {
      $scope.currency = currency;
    }
  });

  if (angular.isUndefined($scope.currency.ticker)) {
    $state.go('app.tab.rates.view');
  }

});