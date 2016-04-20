var app = angular.module('ionicApp', 
    ['ionic', 
     'ionicApp.controllers', 
     'ionicApp.services', 
     'ionicApp.controllers.menu', 
     'ionicApp.controllers.wallet',
     'ionicApp.controllers.rates',
     'highcharts-ng']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'AppCtrl'
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
                templateUrl: 'views/menu-setting.html'
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
                templateUrl: 'views/menu-anon.html'
            },
            'menu-right': {
                templateUrl: 'views/menu-setting.html'
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
                controller: 'WalletCtrl'
            }
        }
    })

    .state('app.tab.wallet.all', {
        url: '/all',
        views: {
            'tab-wallet-all': {
                templateUrl: 'views/wallet/tab-wallet-list.html',
                controller: 'WalletListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.wallet.all-view', {
        url: '/all/:id',
        views: {
            'tab-wallet-all': {
                templateUrl: 'views/wallet/view-wallet.html',
                controller: 'WalletViewCtrl'
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
                templateUrl: 'views/wallet/tab-wallet-list.html',
                controller: 'WalletListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.wallet.sent-view', {
        url: '/sent/:id',
        views: {
            'tab-wallet-sent': {
                templateUrl: 'views/wallet/view-wallet.html',
                controller: 'WalletViewCtrl'
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
                templateUrl: 'views/wallet/tab-wallet-list.html',
                controller: 'WalletListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'receive';
            }
        }
    })

    .state('app.tab.wallet.receive-view', {
        url: '/receive/:id',
        views: {
            'tab-wallet-receive': {
                templateUrl: 'views/wallet/view-wallet.html',
                controller: 'WalletViewCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'receive';
            }
        }
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var path = '/app/rates/view';
        var cs = $injector.get('ConfSrvc');
        var as = $injector.get('AuthSrvc');
        if (as.logged_in) {
            path = '/app/tab/rates/view';
        }
        $location.path(path);
    });

});
