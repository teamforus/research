module.exports = {
    templateUrl: './assets/tpl/pages/validators.html',
    controller: [
        '$state',
        '$timeout',
        '$stateParams',
        function(
            $state,
            $timeout,
            $stateParams
        ) {
            var ctrl = this;

            if (!$stateParams.data ||
                $stateParams.data.record.state != 'pending') {
                return $state.go('records');
            }

            ctrl.validate = function(validator) {
                return $state.go('validator-digid', $stateParams);
            };
        }
    ]
};