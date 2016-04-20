
angular.module('ionicApp.controllers',[])

.controller('AppCtrl', function($scope, UserSrvc, AuthSrvc, ConfSrvc) {
    $scope.placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    $scope.bookmarks = [];
    UserSrvc.GetUsers(5).then(function(items) {
        $scope.bookmarks = items;
    });
    $scope.friends = [];
    UserSrvc.GetUsers(7).then(function(items) {
        $scope.friends = items;
    });
    $scope.groups = [];
    UserSrvc.GetUsers(3).then(function(items) {
        $scope.groups = items;
    });
    $scope.auth = AuthSrvc;
    $scope.conf = ConfSrvc;
})

.controller('JournalCtrl', function($scope, $stateParams, UserSrvc) {
    $scope.rates = $stateParams.rates;
    $scope.title = 'Rates - ' + $scope.rates;
    $scope.mode = 'rates';
    $scope.posts = [];
    UserSrvc.GetUsers(20).then(function(items) {
        $scope.posts = items;
    });
    $scope.doRefresh = function() {
        UserSrvc.GetUsers(1).then(function(items) {
            $scope.posts = items.concat($scope.posts);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.loadMore = function() {
        UserSrvc.GetUsers(10).then(function(items) {
            $scope.posts = $scope.posts.concat(items);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
})

.controller('FriendsCtrl', function($scope, UserSrvc) {
    $scope.rates = 'posts';
    $scope.title = 'Friends';
    $scope.mode = 'friends';
    $scope.posts = [];
    UserSrvc.GetUsers(20).then(function(items) {
        $scope.posts = items;
    });
})

.controller('PostCtrl', function($scope, $stateParams, UserSrvc) {
    $scope.post = {};
    UserSrvc.GetUsers(1).then(function(items) {
        $scope.post = items[0];
    });
    //$scope.post = JournalSrvc.get($stateParams.postId);
})

.controller('traderCtrl', function($scope) {

});
