var app = angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 'ionicApp.services']);

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
            }
        }
    })

    .state('app.journal', {
        url: '/journal/:journal',
        views: {
            'menu-content': {
                templateUrl: 'views/tab-feed.html',
                controller: 'JournalCtrl'
            },
            'menu-left': {
                templateUrl: 'views/menu-anon.html'
            }
        }
    })

    .state('app.journal-post', {
        url: '/journal/:journal/:postId',
        views: {
            'menu-content': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('app.tab.journal', {
        url: '/journal/:journal',
        views: {
            'tab-journal': {
                templateUrl: 'views/tab-feed.html',
                controller: 'JournalCtrl'
            }
        }
    })

    .state('app.tab.journal-post', {
        url: '/journal/:journal/:postId',
        views: {
            'tab-journal': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('app.tab.friends', {
        url: '/friends/posts',
        views: {
            'tab-friends': {
                templateUrl: 'views/tab-feed.html',
                controller: 'FriendsCtrl'
            }
        }
    })

    .state('app.tab.friends-post', {
        url: '/friends/posts/:postId',
        views: {
            'tab-friends': {
                templateUrl: 'views/view-post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('app.tab.favourites', {
        url: '/favourites',
        views: {
            'tab-favourites': {
                templateUrl: 'views/tab-favourites.html',
                controller: 'FavouritesCtrl'
            }
        }
    })

    .state('app.tab.messages', {
        url: '/messages',
        views: {
            'tab-messages': {
                templateUrl: 'views/message/tab-messages.html',
                controller: 'MessagesCtrl'
            }
        }
    })

    .state('app.tab.messages.all', {
        url: '/all',
        views: {
            'tab-messages-all': {
                templateUrl: 'views/message/tab-message-list.html',
                controller: 'MessageListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.messages.all-view', {
        url: '/all/:id',
        views: {
            'tab-messages-all': {
                templateUrl: 'views/message/view-message.html',
                controller: 'MessageViewCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'all';
            }
        }
    })

    .state('app.tab.messages.sent', {
        url: '/sent',
        views: {
            'tab-messages-sent': {
                templateUrl: 'views/message/tab-message-list.html',
                controller: 'MessageListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.messages.sent-view', {
        url: '/sent/:id',
        views: {
            'tab-messages-sent': {
                templateUrl: 'views/message/view-message.html',
                controller: 'MessageViewCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'sent';
            }
        }
    })

    .state('app.tab.messages.flagged', {
        url: '/flagged',
        views: {
            'tab-messages-flagged': {
                templateUrl: 'views/message/tab-message-list.html',
                controller: 'MessageListCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'flagged';
            }
        }
    })

    .state('app.tab.messages.flagged-view', {
        url: '/flagged/:id',
        views: {
            'tab-messages-flagged': {
                templateUrl: 'views/message/view-message.html',
                controller: 'MessageViewCtrl'
            }
        },
        resolve: {
            mode: function() {
                return 'flagged';
            }
        }
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var path = '/app/journal/';
        var cs = $injector.get('ConfSrvc');
        var as = $injector.get('AuthSrvc');
        if (as.logged_in) {
            path = '/app/tab/journal/';
        }
        $location.path(path + cs.current);
    });

});
