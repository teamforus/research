module.exports = {
    templateUrl: './assets/tpl/pages/qr-scanner-send.html',
    controller: [
        '$state',
        '$stateParams',
        'QrScannerService',
        'IntentService',
        function(
            $state,
            $stateParams,
            QrScannerService,
            IntentService,
        ) {
            var ctrl = this;

            if (!$stateParams.data) {
                return $state.go('send');
            }

            QrScannerService.scan().then(function(text) {
                var data = JSON.parse(JSON.stringify($stateParams.data));

                data.address = text;

                $state.go('send-confirm', {
                    data: data
                })
            }, function(err) {
                if (typeof err != 'object') {
                    alert(err);
                } else {
                    console.log(err);
                }
            });

            ctrl.$onDestroy = function () {
                QrScannerService.cancelScan(console.log);
            };
        }
    ]
};