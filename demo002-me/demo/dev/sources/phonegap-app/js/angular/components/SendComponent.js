module.exports = {
    templateUrl: './assets/tpl/pages/send.html',
    controller: [
        '$state',
        '$stateParams',
        'TransactionService',
        function(
            $state,
            $stateParams,
            TransactionService
        ) {
            var ctrl = this;

            if (!$stateParams.data) {
                $state.go('wallet-tokens');
            }

            ctrl.form = {
                values: {},
                errors: {},
            };

            ctrl.scanCode = function() {
                ctrl.form.values.token = $stateParams.data.token

                TransactionService.validateSendRequest(
                    ctrl.form.values
                ).then(function(res) {
                    $state.go('qr-scanner-send', {
                        data: JSON.parse(JSON.stringify(ctrl.form.values))
                    });
                }, function(res) {
                    ctrl.form.errors = res.data;
                });
            };
        }
    ]
};