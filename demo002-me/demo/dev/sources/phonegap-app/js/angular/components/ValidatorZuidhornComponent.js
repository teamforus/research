module.exports = {
    templateUrl: './assets/tpl/pages/validator-zuidhorn.html',
    controller: [
        '$state', 
        '$timeout',
        '$stateParams',
        'AuthService',
        'IntentService',
        'RecordsService',
        function(
            $state,
            $timeout,
            $stateParams,
            AuthService,
            IntentService,
            RecordsService
        ) {
            var ctrl = this;

            ctrl.showQrCode = true;

            if (!$stateParams.data ||
                $stateParams.data.record.valid) {
                return $state.go('records');
            }

            let checkState = (token) => {
                IntentService.readToken(token).then((res) => {
                    if (res.data.state == 'progress') {
                        ctrl.showTimer = true;
                        ctrl.showQrCode = false;
                        ctrl.showDeclined = false;
                        ctrl.showAccepted = false;

                        $timeout(function () {
                            checkState(token);
                        }, 2000);
                    } else if (res.data.state == 'declined') {
                        ctrl.showTimer = false;
                        ctrl.showQrCode = false;
                        ctrl.showDeclined = true;
                        ctrl.showAccepted = false;
                        
                        $timeout(function() {
                            checkState(token);
                        }, 2000);
                    } else if (res.data.state == 'accepted') {
                        ctrl.showTimer = false;
                        ctrl.showQrCode = false;
                        ctrl.showDeclined = false;
                        ctrl.showAccepted = true;
                    } else {
                        ctrl.showTimer = false;
                        ctrl.showDeclined = false;
                        ctrl.showAccepted = false;

                        $timeout(function () {
                            checkState(token);
                        }, 2000);
                    }
                }, console.log);
            };

            RecordsService.makeValidationIntent($stateParams.data.record.id).then((res) => {
                console.log(res);
                (new QRCode("qrcode")).makeCode(JSON.stringify({
                    type: 'intent',
                    token: res.data.token
                }));

                checkState(res.data.token);
                
            }, console.log);
        }
    ]
};