angular.module('ionicApp.controllers.wallet', [])



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
            case 'receive':
                $scope.data.title = 'Receive';
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
