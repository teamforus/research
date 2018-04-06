module.exports = {
    templateUrl: './assets/tpl/pages/qr-scanner.html',
    controller: [
        '$state',
        'QrScannerService',
        'IntentService',
        function(
            $state,
            QrScannerService,
            IntentService,
        ) {
            var ctrl = this;

            QrScannerService.scan().then(function(text) {
                IntentService.readToken(text).then(function(res) {
                    if (res.data.type == 'auth') {
                        var data = JSON.parse(JSON.stringify(res.data));
                        data.requested = {
                            items: [
                                "First name",
                                "Last name",
                                "BSN"
                            ]
                        };

                        $state.go('share-data', {
                            data: data
                        });   
                    } else if (res.data.type == 'voucher')  {
                        var data = JSON.parse(JSON.stringify(res.data));

                        $state.go('voucher-transaction', {
                            data: data
                        });   
                    } else if (res.data.type == 'ask')  {
                        var data = JSON.parse(JSON.stringify(res.data));

                        $state.go('ask-transaction-confirm', {
                            data: data
                        });   
                    } else {
                        alert('Unknown type: ' + res.data.type);
                    }
                });
            }, function(err) {
                if (typeof err != 'object') {
                    alert(err);
                } else if (err.data && typeof err.data.message != 'undefined') {
                    console.log(err.data.message);
                } else {
                    console.log(err.data);
                }
            });

            ctrl.$onDestroy = function () {
                QrScannerService.cancelScan(console.log);
            };
        }
    ]
};