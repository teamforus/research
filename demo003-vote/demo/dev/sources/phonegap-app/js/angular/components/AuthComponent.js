var controller = function($rootScope, $scope, $state, $timeout, CredentialsService) { 
    var ctrl = this;

    if (!!CredentialsService.get()) {
        $state.go('votes');
    }

    ctrl.authorize = function(accept) {
        var scheme;

        // Don't forget to add the org.apache.cordova.device plugin! 
        if (device.platform === 'iOS') {
            scheme = 'demomeapp://';
        } else if (device.platform === 'Android') {
            scheme = 'io.forus.demo.meapp';
        }

        appAvailability.check(
            // URI Scheme or Package Name 
            scheme,
            // Success callback 
            function() {
                window.open('demomeapp://auth?request=StemApp', '_system')
            },
            function() {
                $timeout(ctrl.showInfo, 0);
            }
        );
    };

    ctrl.showInfo = function() {
        $rootScope.modals.push({
            icon: ['mdi-information-outline'],
            // title: 'Error!',
            descLarge: 'Om deze app te gebruiken heeft u de “me” app demo nodig.',
            type: 'info',
            confirmText: 'Ok',
            vibrate: 0,
            confirm: function() {}
        });
    };
};

module.exports = {
    templateUrl: './assets/templates/pages/auth.html',
    controller: ['$rootScope', '$scope', '$state', '$timeout', 'CredentialsService', controller]
};