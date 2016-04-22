angular.module('ionicApp.controllers')


.controller('loginCtrl', function($scope, $state, $ionicLoading, Identity, 
	$ionicPopup, Session) {

	$scope.onNewProfile = function(){
		console.log('the new profile button is pressed.');
	};

	$scope.onCancle = function(){
		console.log('the onCancle button is pressed.');
	};

	showAlert = function() {
		$ionicPopup.alert({
		  title: 'Errors',
		  content: 'Please fill the correct profile information!'
		}).then(function(res) {
		  console.log('show the alert box.');
		});
	};

	$scope.profile = {};
	$scope.errors = [];

	$scope.submit = function(form) {

		if (!form.$valid) {
			showAlert();
			return;
		}

		$ionicLoading.show({
		  template: '<i class="icon ion-loading-c"></i> Opening profile...'
		});

		Identity.openProfile($scope.profile, function(err, identity, wallet) {
		  $ionicLoading.hide();
		  if (err) {
		    if (err.indexOf('PNOTFOUND') !== -1) {
		      $scope.error = 'Invalid credentials, please try again';
		    } else {
		      $scope.error = 'Couldn\'t establish a connection to the server';
		    }
		    return;
		  }

		  Session.signin(identity);
		  $state.go('setPin', $scope.profile);
		})
	};	

})

.controller('registerCtrl', function($scope, $state, $ionicLoading, Identity, Session) {
  
  $scope.profile = {};
  $scope.errors = [];

  $scope.submit = function(form) {
    if (!form.$valid) return;

    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Creating profile...'
    });

    Identity.createProfile($scope.profile, function(err, identity, wallet) {

      $ionicLoading.hide();
      //$state.go('app.tab.wallet.all', $scope.profile);

      if (err) {
        if (err === 'Invalid username or password') {
          $scope.errors = err;
        } else if (err.indexOf('EEXISTS') !== -1) {
          $scope.errors = 'An account already exists with that email';
        } else {
          $scope.errors = 'Couldn\'t establish a connection to the server';
        }
        return;
      }

      Session.signin(identity);
      $state.go('app.tab.wallet.all', $scope.profile);
    });
  };
});