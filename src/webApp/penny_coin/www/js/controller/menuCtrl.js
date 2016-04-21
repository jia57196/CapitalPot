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

});