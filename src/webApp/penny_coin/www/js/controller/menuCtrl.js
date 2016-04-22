angular.module('ionicApp.controllers')

.controller('MenuCtrl', function($scope, $ionicPopover) {
    $scope.main = {
        show_list: 'bookmarks'
    };

	$ionicPopover.fromTemplateUrl('views/help-about.html', {
	    scope: $scope,
	  }).then(function (popover) {
	    $scope.popover = popover;
	});

	$scope.openHelp = function($event) {
	  $scope.popover.show($event);
	};
	
	$scope.$on('$destroy', function() {
	  $scope.popover.remove();
	});

})

// Note that Addresses, History are only injected to initializate them ASAP
.controller('TabsCtrl', function($scope, $state, $stateParams, Session, Wallets, 
	Proposals, Addresses, History) {
  $scope.wallet = Session.currentWallet = Wallets.get($stateParams.walletId);

  $scope.pendingProposals = function() {
    if (!$scope.wallet || !$scope.wallet.isShared()) return 0;
    return Proposals.filter($scope.wallet, { status: Proposals.STATUS.pending }).length;
  };

});
