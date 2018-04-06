module.exports = {
    templateUrl: './assets/tpl/pages/validator-digid.html',
    controller: [
        '$state', 
        '$timeout',
        '$stateParams',
        'AuthService',
        function(
            $state,
            $timeout,
            $stateParams,
            AuthService
        ) {
            var ctrl = this;

            if (!$stateParams.data ||
                $stateParams.data.record.state != 'pending') {
                return $state.go('records');
            }

            ctrl.validate = function() {
                AuthService.validateRecord($stateParams.data.record.key).then(function() {
                    $state.go('records');
                });
            };
        }
    ]
};