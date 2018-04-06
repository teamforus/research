module.exports = {
    templateUrl: './assets/tpl/pages/ask.html',
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

            ctrl.showQrCode = function() {
                ctrl.form.values.token = $stateParams.data.token

                TransactionService.ask(
                    ctrl.form.values
                ).then(function(res) {
                    var data = JSON.parse(JSON.stringify(ctrl.form.values));

                    data.intent = res.data;

                    $state.go('ask-qr-code', {
                        data: data
                    });
                }, function(res) {
                    ctrl.form.errors = res.data;
                });
            };
        }
    ]
};