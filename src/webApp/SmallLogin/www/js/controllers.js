var app = angular.module('smallLogin.controllers', []);

app.controller('DashCtrl', function($scope) {

});

app.controller('LoginCtrl', function ($scope) {
 	$scope.data = {};
    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
});

app.controller('RegisterCtrl', function ($scope) {
	$scope.data = {};
	
	$scope.register = function(){
		console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);	
	};
});

app.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('LocateCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

app.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
});
