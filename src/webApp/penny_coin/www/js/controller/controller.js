
angular.module('ionicApp.controllers', [])

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

.controller('MenuCtrl', function($scope) {
    $scope.main = {
        show_list: 'bookmarks'
    };
})

.controller('JournalCtrl', function($scope, $stateParams, UserSrvc) {
    $scope.journal = $stateParams.journal;
    $scope.title = 'Journal - ' + $scope.journal;
    $scope.mode = 'journal';
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
    $scope.journal = 'posts';
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

.controller('FavouritesCtrl', function($scope) {

})

.controller('MessagesCtrl', function($scope) {

})

.controller('MessageListCtrl', function(mode, $rootScope, $rootScope, $scope, EmailService) {

    $scope.emails = [];

    $scope.data = {
        showDelete: false,
        mode: mode,
        title: ''
    };

    $scope.setListData = function() {
        switch (mode) {
            case 'all':
                $scope.data.title = 'All';
                $scope.emails = EmailService.getInboxEmails();
                break;
            case 'flagged':
                $scope.data.title = 'Flagged';
                $scope.emails = EmailService.getInboxEmails();
                break;
            case 'sent':
                $scope.data.title = 'Sent';
                $scope.emails = EmailService.getOutboxEmails();
                break;
            default:
                $scope.data.title = 'E-Mails';
        }
    };

    $scope.setListData();

    $scope.onEmailFlag = function(email, e) {
        email.flagged = !email.flagged;
        e.preventDefault();
        $rootScope.emailCounts.flaggedCount = EmailService.getFlaggedEmailCount();
    };

    $scope.onEmailDelete = function(email) {
        $scope.emails.splice($scope.emails.indexOf(email), 1);
    };
})

.controller('MessageViewCtrl', function(mode, $stateParams, $scope, $timeout, EmailService) {
    if (mode == 'sent') {
        $scope.email = EmailService.getOutboxEmail($stateParams.id);
    } else {
        $scope.email = EmailService.getInboxEmail($stateParams.id);
    }
    $timeout(function() {
        $scope.email.was_read = true;
    }, 500);
});
