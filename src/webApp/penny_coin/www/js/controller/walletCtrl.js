angular.module('ionicApp.controllers.wallet', [])



.controller('WalletCtrl', function($scope) {

})

.controller('WalletListCtrl', function(mode, $rootScope, $rootScope, $scope, EmailService) {

    $scope.emails = [];

    $scope.data = {
        showDelete: false,
        mode: mode,
        title: ''
    };

    $scope.setListData = function() {
        switch (mode) {
            case 'all':
                $scope.data.title = 'My Wallet - Balance';
                $scope.emails = EmailService.getInboxEmails();
                break;
            case 'receive':
                $scope.data.title = 'My Wallet - Receive';
                $scope.emails = EmailService.getInboxEmails();
                break;
            case 'sent':
                $scope.data.title = 'My Wallet - Send';
                $scope.emails = EmailService.getOutboxEmails();
                break;
            default:
                $scope.data.title = 'E-Mails';
        }
    };

    $scope.setListData();

})

.controller('WalletViewCtrl', function(mode, $stateParams, $scope, $timeout, EmailService) {

});
