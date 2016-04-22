'use strict'

angular.module('ionicApp.controllers')

.controller('HomeCtrl', 
  function($scope, $rootScope, $state, $controller, $ionicModal, $window, 
    $cordovaSocialSharing, $cordovaClipboard, Rates, Notifications) {
  angular.extend(this, $controller('AbstractModalCtrl', {$scope: $scope}));

  loadCopayers();
  $scope.wallet.on('publicKeyRingUpdated', loadCopayers);

  function loadCopayers() {
    //$scope.copayers = $scope.wallet.getRegisteredPeerIds(); // TODO: Rename method to getCopayers
    //$scope.remaining = $scope.wallet.publicKeyRing.remainingCopayers(); // TODO: Expose on Wallet
    setTimeout(function(){ $scope.$apply(); }, 10);
  }

  $scope.inviteCopayers = function() {
    var secret = $scope.wallet.getSecret();
    $scope.openModal("Wallet secret", secret, secret);
  }

  $rootScope.$on('balance', function(ev, wallet) {
    if ($scope.wallet.id == wallet.id) $scope.$apply();
  });


  $scope.data = {
      mode: mode,
      title: ''
  };

  $scope.setListData = function() {
      switch (mode) {
          case 'all':
              $scope.data.title = 'My Wallet - Balance';
              break;
          case 'receive':
              $scope.data.title = 'My Wallet - Receive';
              break;
          case 'sent':
              $scope.data.title = 'My Wallet - Send';
              break;
          default:
              $scope.data.title = 'E-Mails';
      }
  };

  $scope.setListData();
});
