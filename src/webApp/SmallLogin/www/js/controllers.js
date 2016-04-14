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


app.controller('IntroCtrl', function($scope, $state) {
  //$rootScope.hideBar = true;
  $scope.navTitle = "Everyday to Small Notes!";

  console.log("Page name now is: ", $scope.navTitle);
  //*/ Called to navigate to the main app
  var startApp = function() {
    $state.go('menu.login');

    // Set a flag that we finished the tutorial
    window.localStorage['didTutorial'] = true;
  };//*/

  //No this is silly
  // Check if the user already did the tutorial and skip it if so
if(window.localStorage['didTutorial'] === "true") {
    console.log('Skip intro');
    startApp();
  }
  else{
  setTimeout(function () {
    navigator.splashscreen.hide();
  }, 750);
  }
  

  // Move to the next slide
  $scope.next = function() {
    $scope.$broadcast('slideBox.nextSlide');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Next',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Go to the next slide on tap
        $scope.next();
      }
    }
  ];
  
  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Skip',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Start the app on tap
        startApp();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;


  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    console.log("slide change, ", index);
    // Check if we should update the left buttons
    if(index > 0) {
      // If this is not the first slide, give it a back button
      $scope.leftButtons = [
        {
          content: 'Back',
          type: 'button-positive button-clear',
          tap: function(e) {
            // Move to the previous slide
            $scope.$broadcast('slideBox.update');
          }
        }
      ];
    } else {
      // This is the first slide, use the default left buttons
      $scope.leftButtons = leftButtons;
    }
    
    // If this is the last slide, set the right button to
    // move to the app
    if(index == 2) {
      $scope.rightButtons = [
        {
          content: 'Start using MyApp',
          type: 'button-positive button-clear',
          tap: function(e) {
            startApp();
          }
        }
      ];
    } else {
      // Otherwise, use the default buttons
      $scope.rightButtons = rightButtons;
    }
  };
});

app.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  setTimeout(function () {
    navigator.splashscreen.hide();
  }, 750);
  
  
  $scope.toIntro = function(){
    window.localStorage['didTutorial'] = "false";
    $state.go('/');
  }
});