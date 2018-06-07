module.exports = {
    templateUrl: './assets/tpl/pages/profile.html',
    controller: [
        '$state',
        'AuthService',
        function(
            $state,
            AuthService
        ) {
            var ctrl = this;

            AuthService.getUser().then(function(res) {
                (new QRCode("qrcode")).makeCode(JSON.stringify({
                    type: 'identity_address',
                    value: res.data.address
                }));
            }, console.error);

            ctrl.pincodeForm = {
                errors: {},
                values: {},
            };

            ctrl.showPinCodeForm = false;
            ctrl.showPinCodeFormSuccess = false;

            ctrl.authorizePinCode = () => {
                AuthService.authorizeAuthCode(ctrl.pincodeForm.values.pincode || '').then((res) => {
                    ctrl.pincodeForm.values = [];
                    ctrl.pincodeForm.errors = [];
                    ctrl.showPinCodeForm = false;
                    ctrl.showPinCodeFormSuccess = true;
                }, (res) => {
                    ctrl.pincodeForm.errors.pincode = [res.data.message];
                });
            };
        }
    ]
};