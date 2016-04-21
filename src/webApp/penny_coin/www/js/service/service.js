
angular.module('ionicApp.services')

.factory('Currencies', function () {
  return [
    { code: 'AUD', text: 'Australian Dollar', selected: true },
    { code: 'BRL', text: 'Brazilian Real', selected: false },
    { code: 'CAD', text: 'Canadian Dollar', selected: true },
    // { code: 'CHF', text: 'Swiss Franc', selected: false }, Disabled CHF because the API no longer returns it
    { code: 'CNY', text: 'Chinese Yuan', selected: true},
    { code: 'EUR', text: 'Euro', selected: true },
    { code: 'GBP', text: 'British Pound Sterling', selected: true },
    { code: 'IDR', text: 'Indonesian Rupiah', selected: false },
    { code: 'ILS', text: 'Israeli New Sheqel', selected: false },
    { code: 'MXN', text: 'Mexican Peso', selected: true },
    { code: 'NOK', text: 'Norwegian Krone', selected: false },
    { code: 'NZD', text: 'New Zealand Dollar', selected: false },
    { code: 'PLN', text: 'Polish Zloty', selected: false },
    { code: 'RON', text: 'Romanian Leu', selected: false },
    { code: 'RUB', text: 'Russian Ruble', selected: true },
    { code: 'SEK', text: 'Swedish Krona', selected: false },
    { code: 'SGD', text: 'Singapore Dollar', selected: false },
    { code: 'USD', text: 'United States Dollar', selected: true },
    { code: 'ZAR', text: 'South African Rand', selected: false }
  ];
})

.factory('UserSrvc', function($http) {
    var BASE_URL = 'http://api.randomuser.me/';
    var items = [];

    return {
        GetUsers: function(count) {
            return $http.get(BASE_URL + '?results=' + count).then(function(response) {
                items = response.data.results;
                return items;
            });
        }
    };
})

.service('ConfSrvc', function() {
    this.current = 'muahaha';
})

.service('AuthSrvc', function() {
    this.logged_in = true;
})

.directive('actualSrc', function() {
    return {
        link: function postLink(scope, element, attrs) {
            attrs.$observe('actualSrc', function(newVal, oldVal) {
                if (newVal !== undefined) {
                    var img = new Image();
                    img.src = attrs.actualSrc;
                    angular.element(img).bind('load', function() {
                        element.attr("src", attrs.actualSrc);
                    });
                }
            });
        }
    };
})

.factory('EmailService', function($filter) {
    var inbox = [];
    var outbox = [];

    var data = {
        flagged: 0
    };

    function readInboxEmails() {
        if (inbox.length) {
            return;
        }
        inbox = [{
            id: 0,
            subject: 'Test subj #1',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: false
        }, {
            id: 1,
            subject: 'Test subj #2',
            date: '0',
            from: 'John',
            body: 'Test e-mail body #2',
            was_read: false
        }, {
            id: 2,
            subject: 'Test subj #3',
            date: '0',
            from: 'dd John Doe',
            body: 'Test e-mail body #3',
            was_read: false
        }, {
            id: 3,
            subject: 'Test subj #4',
            date: '0',
            from: 'Doe',
            body: 'Test e-mail body #1',
            was_read: false
        }, {
            id: 4,
            subject: 'Test subj #1',
            date: '0',
            from: 'John',
            body: 'Test e-mail body #1',
            was_read: false
        }, {
            id: 5,
            subject: 'dfhdsfhsdfhsdf',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: false
        }, {
            id: 6,
            subject: 'Test subj #1',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: false
        }, {
            id: 7,
            subject: 'Test subj #1',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: false,
            flagged: true
        }, {
            id: 8,
            subject: 'dhfsdf dfhdasfhsdf',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: false,
            flagged: true
        },{
            id: 50,
            subject: 'Test subj last',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: true
        }];
    };

    function readOutboxEmails() {
        if (outbox.length) {
            return;
        }
        outbox = [{
            id: 0,
            subject: 'Out - Test subj #1',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: true
        }, {
            id: 1,
            subject: 'Out - Test subj #2',
            date: '0',
            from: 'John',
            body: 'Test e-mail body #2',
            was_read: true
        }, {
            id: 2,
            subject: 'Out - Test subj #3',
            date: '0',
            from: 'dd John Doe',
            body: 'Test e-mail body #3',
            was_read: true
        }, {
            id: 3,
            subject: 'Out - Test subj #4',
            date: '0',
            from: 'Doe',
            body: 'Test e-mail body #1',
            was_read: true
        }, {
            id: 4,
            subject: 'Out - Test subj #1',
            date: '0',
            from: 'John',
            body: 'Test e-mail body #1',
            was_read: true
        }, {
            id: 50,
            subject: 'Out - Test subj last',
            date: '0',
            from: 'John Doe',
            body: 'Test e-mail body #1',
            was_read: true
        }];
    };

    function setFlaggedEmailCount() {
        readInboxEmails();
        data.flagged = $filter('filter')(inbox, {
            flagged: true
        }).length;
        console.log(data.flagged);
    };

    return {
        getInboxEmailCount: function() {
            readInboxEmails();
            return inbox.length;
        },
        getFlaggedEmailCount: function() {
            setFlaggedEmailCount();
            return data.flagged;
        },
        getOutboxEmailCount: function() {
            readOutboxEmails();
            return outbox.length;
        },
        getInboxEmails: function() {
            readInboxEmails();
            return inbox;
        },
        getOutboxEmails: function() {
            readOutboxEmails();
            return outbox;
        },
        getInboxEmail: function(id) {
            for (i = 0; i < inbox.length; i++) {
                if (inbox[i].id == id) {
                    return inbox[i];
                }
            }
            return null;
        },
        getOutboxEmail: function(id) {
            for (i = 0; i < outbox.length; i++) {
                if (outbox[i].id == id) {
                    return outbox[i];
                }
            }
            return null;
        }
    }
});

