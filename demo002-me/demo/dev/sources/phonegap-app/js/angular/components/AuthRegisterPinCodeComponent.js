module.exports = {
    templateUrl: './assets/tpl/pages/auth-register-pincode.html',
    controller: [
        '$scope',
        '$timeout',
        '$rootScope',
        '$state',
        'AuthService',
        function(
            $scope,
            $timeout,
            $rootScope,
            $state,
            AuthService
        ) {
            var ctrl = this;
            
            ctrl.digits = [];

            $scope.$on('pincode_input', (e, digits) => {
                $timeout(() => { ctrl.digits = digits; });
            });

            ctrl.cancel = function() {
                $state.go('logout');
            };

            ctrl.submit = function () {
                AuthService.setPinCode(ctrl.digits.join('')).then((res) => {
                    $state.go('records');
                }, console.log)
            };
        }
    ]
};