// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('smallLogin', ['ionic', 'smallLogin.controllers', 'smallLogin.services']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.navigator && window.navigator.splashscreen) {
        window.plugins.orientationLock.unlock();
    }
    if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
    }
    if (window.cordova){
        // Hide Splash Screen when App is Loaded
        $cordovaSplashscreen.hide();
    }

  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      }
    }
  })
  .state('tab.register', {
    url: '/register',
    views: {
      'tab-login': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      }
    }
  })
  .state('tab.wallet', {
    url: '/wallet',
    views: {
      'tab-wallet': {
        templateUrl: 'templates/tab-wallet.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.locate', {
    url: '/locate',
    views: {
      'tab-locate': {
        templateUrl: 'templates/tab-locate.html',
        controller: 'LocateCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
