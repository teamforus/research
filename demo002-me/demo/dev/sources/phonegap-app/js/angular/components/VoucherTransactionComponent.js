module.exports = {
    templateUrl: './assets/tpl/pages/voucher-transaction.html',
    controller: [
        '$state', 
        '$timeout',
        '$stateParams',
        'AuthService',
        'IntentService',
        function(
            $state,
            $timeout,
            $stateParams,
            AuthService,
            IntentService
        ) {
            var ctrl = this;

            if (!$stateParams.data ||
                $stateParams.data.state != 'pending') {
                return $state.go('records');
            }

            ctrl.showAccepted = false;

            ctrl.accept = function() {
                IntentService.acceptToken($stateParams.data.token).then(function() {
                    ctrl.showAccepted = true;
                }, function(res) {
                    alert(res.data.message);
                });
            }

            ctrl.voucher = $stateParams.data.voucher;
        }
    ]
};