var app = angular.module('ionicApp');

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html'
    })

    .state('app.tab', {
        url: '/tab',
        abstract: true,
        views: {
            'menu-content': {
                templateUrl: 'views/tabs.html'
            },
            'menu-left': {
                templateUrl: 'views/menu-auth.html',
                controller: 'MenuCtrl'
            },
            'menu-right': {
                templateUrl: "views/settings.html",
                controller: "SettingsCtrl"
            }    
        }
    })
    .state('app.login', {
        url: '/login',
        cache: false,
        views: {
            'menu-content': {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            },
            'menu-left': {
                templateUrl: 'views/menu-anon.html',
                controller: 'MenuCtrl'
            },
            'menu-right': {
                templateUrl: "views/settings.html",
                controller: "SettingsCtrl"
            }               
        }
    })
    .state('app.register', {
        url: '/register',
        cache:false,
        views: {
            'menu-content': {
                templateUrl: 'views/user/register.html',
                controller: 'registerCtrl'
            },
            'menu-left': {
                templateUrl: 'views/menu-anon.html',
                controller: 'MenuCtrl'
            },
            'menu-right': {
                templateUrl: "views/settings.html",
                controller: "SettingsCtrl"
            }    
        }
    })
    .state('app.rates', {
        url: '/rates',
        views: {
            'menu-content': {
                templateUrl: 'views/rates/tab-rates.html'
            },
            'menu-left': {
                templateUrl: 'views/menu-auth.html'
            }          
        }
    })

    .state('app.tab.rates', {
        url: '/rates',
        views: {
            'tab-rates': {
                templateUrl: 'views/rates/tab-rates.html',
                controller: 'RatesCtrl'
            }      
        }
    })

    .state('app.tab.rates.view', {
        url: '/view',
        views: {
            'tab-rates-view': {
                templateUrl: 'views/rates/tab-rates-view.html',
                controller: 'RatesCtrl'
            }
        }
    })
    .state('app.tab.rates.history', {
        url: '/history?currency',
        cache: false,
        views: {
            'tab-rates-history': {
                templateUrl: 'views/rates/tab-rates-history.html',
                controller: 'HistoryController'
            }
        }
    })
    .state('app.tab.rates.detail', {
      url: '/detail/:currency',
      views: {
         'tab-rates-view': {
          templateUrl: 'views/rates/detail.html',
          controller: 'DetailController'
        }
      }
    })    
    .state('app.tab.rates.currencies', {
        url: '/currencies',
        views: {
            'tab-rates-currencies': {
                templateUrl: 'views/rates/tab-rates-currencies.html',
                controller: 'CurrenciesController'
            }
        }
    })

    .state('app.tab.chat', {
        url: '/chat',
        views: {
            'tab-chat': {
                templateUrl: 'views/tab-chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

    .state('app.tab.chat-detail', {
        url: '/chat/:chatId',
        views: {
            'tab-chat': {
                templateUrl: 'views/tab-chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('app.tab.trader', {
        url: '/trader',
        views: {
            'tab-trader': {
                templateUrl: 'views/tab-trader.html',
                controller: 'traderCtrl'
            }
        }
    })

    .state('app.tab.wallet', {
        url: '/wallet',
        views: {
            'tab-wallet': {
                templateUrl: 'views/wallet/tab-wallet.html',
                controller: 'TabsCtrl'
            }
        }
    })
    .state('app.tab.wallet.all', {
        url: '/all',
        views: {
            'tab-wallet-all': {
                templateUrl: 'views/wallet/wallet-home.html',
                controller: 'HomeCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.wallet.home', {
        url: '/home/:id',
        views: {
            'tab-wallet-all': {
                templateUrl: 'views/wallet/wallet-home.html',
                controller: 'HomeCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.wallet.sent', {
        url: '/sent',
        views: {
            'tab-wallet-sent': {
                templateUrl: 'views/wallet/sent.html',
                controller: 'SendCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.wallet.receive', {
        url: '/receive',
        views: {
            'tab-wallet-receive': {
                templateUrl: 'views/wallet/receive.html',
                controller: 'ReceiveCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'receive';
            }
        }
    });


    $urlRouterProvider.otherwise(function($injector, $location) {
        var path = '/app/rates';
        var cs = $injector.get('ConfSrvc');
        var as = $injector.get('AuthSrvc');
        if (as.logged_in) {
            path = '/app/tab/rates/view';
        }
        $location.path(path);
    });

});


app.run(['$state', '$window', function ($state, $window, Decoder) {

  function handleBitcoinIntent(url) {
    Decoder.process(data);
  }

  $window.handleOpenURL = handleBitcoinIntent;
}]);

app.run(['$rootScope', '$state', 'Session', function ($rootScope, $state, Session) {

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    // Redirect to PIN screen
    if (!Session.isLogged() && Session.hasCredentials() && toState.name != 'pin') {
      event.preventDefault();
      return $state.go('pin', toParams);
    }

    // If not logged redirect to home
    var isPrivate = !!(toState.data && toState.data.auth);
    if (!Session.isLogged() && !Session.hasCredentials() && isPrivate) {
      event.preventDefault();
      return $state.go('start.welcome');
    }

  });

}]);
