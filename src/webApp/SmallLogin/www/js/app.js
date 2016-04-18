
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

  $stateProvider.state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('settings', {
    url: '/settings',
    abstract: true,
    cache: false,
    templateUrl: 'templates/setting-menu.html'
  })    
  .state('menu', {
    url: '/menu',
    abstract: true,
    cache: false,
    templateUrl: 'templates/sideMenu.html'
  })  
  .state('settings.login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html'
  })
  .state('settings.register', {
    url: '/register',
    templateUrl: 'templates/register.html'
  })
  .state('menu.wallet', {
    url: '/wallet',
    cache: false,
    views: {
      'tab-wallet': {
        templateUrl: 'templates/tab-wallet.html',
        controller: 'DashCtrl'
      }
    },
    templateUrl: 'templates/wallet-home.html'
  })
  .state('menu.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('menu.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('menu.locate', {
    url: '/locate',
    views: {
      'tab-locate': {
        templateUrl: 'templates/tab-locate.html',
        controller: 'LocateCtrl'
      }
    }
  })
  .state('menu.rates', {
    url: '/rates',
    views: {
      'tab-rates': {
        templateUrl: 'templates/tab-rates.html',
        controller: 'RatesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
