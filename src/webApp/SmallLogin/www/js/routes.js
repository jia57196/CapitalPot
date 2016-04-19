
var app = angular.module('smallLogin');

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
  .state('settings.login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html'
  })
  .state('settings.preference', {
    url: '/preference',
    cache: false,
    templateUrl: 'templates/preference.html'
  })  
  .state('settings.options', {
    url: '/options',
    templateUrl: 'templates/options.html'
  })    
  .state('settings.register', {
    url: '/register',
    templateUrl: 'templates/register.html'
  })  
  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/sideMenu.html'
  }) 
  .state('menu.tab', {
    url: '/tab',
    abstract: true,
    views: {
      'menu-content': {    
        templateUrl: 'templates/tabs.html'
      }
    }
  }) 
  .state('menu.tab.wallet', {
    url: '/wallet',
    views: {
      'tab-wallet': {
        templateUrl: 'templates/wallet/tab-wallet.html',
        controller: 'TabsCtrl'
      }
    }
  })
  .state('menu.tab.wallet.home', {
      url: "/home",
      views: {
        'tab-wallet-home' :{
          templateUrl: "templates/wallet/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
  .state('menu.tab.wallet.receive', {
      url: "/receive",
      views: {
        'tab-wallet-receive' :{
          templateUrl: "templates/wallet/receive.html",
          controller: "ReceiveCtrl"
        }
      }
    })
  .state('menu.tab.wallet.send', {
      url: "/send?data",
      views: {
        'tab-wallet-send' :{
          templateUrl: "templates/wallet/send.html",
          controller: "SendCtrl"
        }
      }
    })
  .state('menu.tab.wallet.proposal', {
      url: "/proposal/:proposalId",
      views: {
        'tab-wallet-proposal' :{
          templateUrl: "templates/wallet/proposal.html",
          controller: "ProposalCtrl"
        }
      }
    })
  .state('menu.tab.wallet.history', {
      url: "/history",
      views: {
        'tab-wallet-history' :{
          templateUrl: "templates/wallet/history.html",
          controller: 'HistoryCtrl'
        }
      }
    })
  .state('menu.tab.chats', {
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
  .state('menu.tab.locate', {
    url: '/locate',
    views: {
      'tab-locate': {
        templateUrl: 'templates/tab-locate.html',
        controller: 'LocateCtrl'
      }
    }
  })
  .state('menu.tab.rates', {
    url: '/rates',
    views: {
      'tab-rates': {
        templateUrl: 'templates/rates/tab-rates.html',
        controller: 'RatesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
