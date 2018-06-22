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
            var scannerActive = true;
            
            ctrl.notAvailableQr = false;

            ctrl.reloadState = function() {
                $state.go($state.$current.name, {}, {
                    reload: true
                });
            };

            QrScannerService.scan().then(function (code) {
                QrScannerService.cancelScan();
                scannerActive = false;
                let res = {};

                try {
                    res.data = JSON.parse(code);
                } catch (e) {
                    alert('Invalid qr code.');
                    ctrl.reloadState();
                }

                if (res.data.type == 'intent') {
                    IntentService.readToken(res.data.token).then(function (res) {
                        if (res.data.type == 'ask') {
                            var data = JSON.parse(JSON.stringify(res.data));

                            $state.go('ask-transaction-confirm', {
                                data: data
                            });
                        } else if (res.data.type == 'voucher') {
                            ctrl.notAvailableQr = true;
                        } else if (res.data.type == 'validate_record') {
                            var data = JSON.parse(JSON.stringify(res.data));

                            $state.go('validator-zuidhorn-confirm', {
                                data: data
                            });
                        } else {
                            alert('Unknown type: ' + res.data.type);
                        }
                    });
                } else if (res.data.type == 'auth_token') {
                    var data = JSON.parse(JSON.stringify(res.data));

                    data.requested = {
                        items: [
                            "Voornaam",
                            "Achternaam",
                            "BSN"
                        ]
                    };

                    $state.go('share-data', {
                        data: data
                    });
                } else if (res.data.type == 'voucher') {
                    ctrl.notAvailableQr = true;
                } else {
                    ctrl.notAvailableQr = true;
                }
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
                if (scannerActive) {
                    QrScannerService.cancelScan();
                }
            };
        }
    ]
};