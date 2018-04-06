module.exports = {
    templateUrl: './assets/tpl/pages/ask-qr-code.html',
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
            var interval = false;

            ctrl.showAccepted = false;
            ctrl.showDeclined = false;

            ctrl.request = $stateParams.data;

            if (!$stateParams.data || !$stateParams.data.intent) {
                return $state.go('wallet-tokens');
            }

            (new QRCode("qrcode")).makeCode(
                $stateParams.data.intent.token
            );

            interval = setInterval(function() {
                TransactionService.askCheck({
                    'token': $stateParams.data.intent.token
                }).then(function(res) {
                    if (res.data.state == 'pending') {
                        return;
                    }

                    if (res.data.state == 'accepted') {
                        ctrl.showAccepted = true;
                        clearInterval(interval);
                    }

                    if (res.data.state == 'declined') {
                        ctrl.showDeclined = true;
                        clearInterval(interval);
                    }
                }, console.log);
            }, 2000);

            ctrl.$onDestroy = function() {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }
    ]
};