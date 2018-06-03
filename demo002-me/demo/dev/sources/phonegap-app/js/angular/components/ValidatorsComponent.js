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
                $stateParams.data.record.valid) {
                return $state.go('records');
            }

            $state.$current.data.header.title = $stateParams.data.record.value;
            $state.$current.data.header.navbar.text = $stateParams.data.record.name;

            ctrl.validate = function(validator) {
                return $state.go('validator-' + validator, $stateParams);
            };
        }
    ]
};