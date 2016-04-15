var app = angular.module('smallLogin.controllers', []);

app.controller('DashCtrl', function($scope) {

});

app.controller('LoginCtrl', function ($scope) {
 	$scope.data = {};

  $scope.login = function() {
      console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
  }

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });     
});

app.controller('RegisterCtrl', function ($scope) {
	$scope.data = {};
	
	$scope.register = function(){
		console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);	
	};

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  }); 
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


app.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  //$rootScope.hideBar = true;
  $scope.navTitle = "Everyday to Small Notes!";
  $scope.index = 0;
  $scope.nextName = 'Next';
  $scope.backName = 'Skip';

  $scope.goBack = function (){
    if ($scope.backName === 'Skip'){
      startApp();
      return;
    }
    $scope.previous();
  };

  $scope.goNext = function (){
    if ($scope.index >= 2){
      startApp();
      return;
    }    
    $scope.next();
  };

  //*/ Called to navigate to the main app
  var startApp = function() {
    $state.go('menu.login');

    // Set a flag that we finished the tutorial
    window.localStorage['didTutorial'] = true;
  };//*/

  //No this is silly
  // Check if the user already did the tutorial and skip it if so
  if(window.localStorage['didTutorial'] === "true") {
    //TODO.... not to check for tempor
    //startApp();
  }
  else{
    setTimeout(function () {
      navigator.splashscreen.hide();
    }, 750);
  }
  
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Move to the next slide
  $scope.next = function() {
    $scope.$broadcast('slideBox.nextSlide');
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    console.log("slide change, ", index);
    $scope.index = index;


    // Check if we should update the left buttons
    if(index > 0) {
      $scope.backName = "Back";
    } else {
      // This is the first slide, use the default left buttons
      $scope.backName = "Skip";
    }
    
    // If this is the last slide, set the right button to
    // move to the app
    if(index === 2) {
      $scope.nextName = 'Start using MyApp';
    } else {
      // Otherwise, use the default buttons
      $scope.nextName = 'Next';
    }
  };
});
