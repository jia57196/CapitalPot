var app = angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 
    'ionicApp.services', 'ionicApp.controllers.menu', 'ionicApp.controllers.wallet']);

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
})

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
        url: '/rates/:rates',
        views: {
            'menu-content': {
                templateUrl: 'views/tab-feed.html',
                controller: 'JournalCtrl'
            },
            'menu-left': {
                templateUrl: 'views/menu-anon.html'
            },
            'menu-right': {
                templateUrl: 'views/menu-setting.html'
            }            
        }
    })

    .state('app.rates-post', {
        url: '/rates/:rates/:postId',
        views: {
            'menu-content': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('app.tab.rates', {
        url: '/rates/:rates',
        views: {
            'tab-rates': {
                templateUrl: 'views/tab-feed.html',
                controller: 'JournalCtrl'
            }
        }
    })

    .state('app.tab.rates-post', {
        url: '/rates/:rates/:postId',
        views: {
            'tab-rates': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('app.tab.chat', {
        url: '/chat/posts',
        views: {
            'tab-chat': {
                templateUrl: 'views/tab-feed.html',
                controller: 'FriendsCtrl'
            }
        }
    })

    .state('app.tab.chat-post', {
        url: '/chat/posts/:postId',
        views: {
            'tab-chat': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
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
                controller: 'MessagesCtrl'
            }
        }
    })

    .state('app.tab.wallet.all', {
        url: '/all',
        views: {
            'tab-wallet-all': {
                templateUrl: 'views/wallet/tab-wallet-list.html',
                controller: 'MessageListCtrl'
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
                controller: 'MessageViewCtrl'
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
                controller: 'MessageListCtrl'
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
                controller: 'MessageViewCtrl'
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
                controller: 'MessageListCtrl'
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
                controller: 'MessageViewCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'receive';
            }
        }
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var path = '/app/rates/';
        var cs = $injector.get('ConfSrvc');
        var as = $injector.get('AuthSrvc');
        if (as.logged_in) {
            path = '/app/tab/rates/';
        }
        $location.path(path + cs.current);
    });

});
