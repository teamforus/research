module.exports = {
    templateUrl: './assets/tpl/pages/auth-restore.html',
    controller: [
        '$state',
        '$timeout',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            $timeout,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.showPinCode = false;
            ctrl.showEmailForm = false;

            ctrl.emailForm = {
                values: {},
                errors: {}
            };

            AuthService.makeAuthToken().then((res) => {
                (new QRCode("qrcode")).makeCode(JSON.stringify({
                    type: "auth_token",
                    value: res.data.auth_token
                }));

                checkAccessTokenStatus('token', res.data.access_token);
            }, console.log);

            var checkAccessTokenStatus = (type, access_token) => {
                AuthService.checkAccessToken(access_token).then((res) => {
                    if (res.data.status == 'active') {
                        if (res.data.type == 'personal') {
                            CredentialsService.add(access_token, "");
                            CredentialsService.set(access_token);

                            AuthService.getName().then((name) => {
                                CredentialsService.update(access_token, name);
                                $state.go('records');
                            }, console.log);
                        } else {
                            CredentialsService.set(CredentialsService.getDefault().access_token);
                            $state.go('records');
                        }
                    } else if (res.data.status == 'pending') {
                        $timeout(function () {
                            if (type == 'code' && !ctrl.showPinCode) {
                                return false;
                            }

                            checkAccessTokenStatus(type, access_token);
                        }, 2500);
                    }
                });
            };

            ctrl.requestPinCode = () => {
                AuthService.makeAuthCode().then((res) => {
                    ctrl.pinCode = (res.data.auth_code + "").split("");
                    checkAccessTokenStatus('code', res.data.access_token);

                    ctrl.showPinCode = true;
                }, console.log);
            };

            ctrl.requestPinCodeClose = () => {
                ctrl.pinCode = [];
                ctrl.showPinCode = false;
            };

            ctrl.requestEmailToken = () => {
                ctrl.showEmailForm = true;
            };

            ctrl.requestEmailTokenClose = () => {
                ctrl.showEmailForm = false;
            };

            ctrl.requestEmailTokenSubmit = () => {
                if (ctrl.emailForm.values.email != ctrl.emailForm.values.email_confirmation) {
                    ctrl.emailForm.errors.email_confirmation = ["Don't match."];
                    return;
                } else {
                    ctrl.emailForm.errors.email_confirmation = [];
                }

                AuthService.makeAuthEmailToken('app.me_app', ctrl.emailForm.values.email).then((res) => {
                    ctrl.showEmailForm = false;
                    ctrl.showEmailSent = true;
                    ctrl.emailForm.values = {};
                }, (res) => {
                    ctrl.showEmailSent = false;
                    ctrl.emailForm.errors = res.data.errors;
                });
            };

            ctrl.hideEmailSentSuccess = () => {
                ctrl.showEmailSent = false;
            };
        }
    ]
};