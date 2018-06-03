kindpakketApp.controller('BaseController', [
    '$scope',
    '$state',
    '$timeout',
    '$rootScope',
    'AuthService',
    'CategoryService',
    'FormBuilderService',
    'CredentialsService',
    function(
        $scope,
        $state,
        $timeout,
        $rootScope,
        AuthService,
        CategoryService,
        FormBuilderService,
        CredentialsService
    ) {
        $rootScope.$state = $scope.$state = $state;

        $scope.locations = [];
        $scope.forms = {};
        $scope.forms.login = FormBuilderService.build();
        $scope.forms.voucher = FormBuilderService.build();

        $rootScope.credentials = CredentialsService.get();

        $rootScope.auth = {
            step: 1
        };

        $rootScope.auth.signOut = function(e) {
            e && e.stopPropagation() & e.preventDefault();

            AuthService.signOut();

            $rootScope.credentials = CredentialsService.get();

            $state.go('landing');
        };

        $rootScope.auth.signIn = function(e) {
            e && e.stopPropagation() & e.preventDefault();

            $scope.forms.login.reset();

            var checkAccessTokenStatus = (type, access_token) => {
                AuthService.checkAccessToken(access_token).then((res) => {
                    if (res.data.status == 'active') {
                        $rootScope.auth.step = $rootScope.auth.step + 2;
                        CredentialsService.set(access_token);
                        $rootScope.credentials = CredentialsService.get();
                        $rootScope.$broadcast('voucher:fetch');

                        setTimeout(function () {
                            $rootScope.auth.closeModals();
                        }, 2000);
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

            AuthService.makeAuthToken().then(function(res) {
                $('#auth_qr').text('');
                (new QRCode("auth_qr")).makeCode(JSON.stringify({
                    type: "auth_token",
                    value: res.data.auth_token
                }));

                checkAccessTokenStatus('token', res.data.access_token);
            });

            $('body').addClass('popup-open');
            $('.popups .popup').hide();
            $('.popups .popup-forus-auth').show();
        };

        $rootScope.auth.signInSubmit = function(e, form) {
            e && e.stopPropagation() & e.preventDefault();

            if (form.submit)
                return;

            form.submit = true;

            AuthService.sendSignInToken(form.values.email)
                .then(function(response) {
                    $rootScope.auth.closeModals();
                    form.submit = false;

                    $rootScope.modals.push({
                        icon: ['mdi-checkbox-multiple-marked-circle-outline'],
                        descLg: 'Er is een E-mail verstuurd naar ' +
                            $scope.forms.login.values.email +
                            '. Druk op de login-knop in de mail om ' +
                            'verder te gaan.',
                    });

                    form.reset();
                }, function(response) {
                    form.errors = response.data;
                    form.submit = false;
                });
        };

        $rootScope.auth.activateVoucher = function(e) {
            e && e.stopPropagation() & e.preventDefault();

            $scope.forms.voucher.reset();

            $('body').addClass('popup-open');
            $('.popup-voucher').show();
        };

        $rootScope.auth.activateVoucherSuccess = function(e, form) {
            e && e.stopPropagation() & e.preventDefault();

            $rootScope.modals.push({
                icon: ['mdi-checkbox-multiple-marked-circle-outline'],
                descLg: 'Er is een activatie mail gestuurd naar ' +
                    form.values.email +
                    '. Druk op de link in de E-mail om verder te gaan.',
            });

            $scope.forms.voucher.reset();
        };

        $rootScope.auth.activateVoucherSubmit = function(e, form) {
            e && e.stopPropagation() & e.preventDefault();

            if (form.submit)
                return;

            form.submit = true;

            AuthService.activateVoucher(
                form.values.code || 'empty',
                form.values
            ).then(function(response) {
                $rootScope.auth.activateVoucherSuccess(false, form);
                form.submit = false;
            }, function(response) {
                form.errors = response.data;

                if (form.values.code && form.errors.code)
                    form.errors.code = ['Deze activatie code niet ' +
                        'correct of reeds geactiveerd'
                    ];

                form.submit = false;
            });
        };

        $rootScope.auth.closeModals = function(e) {
            e && e.stopPropagation() & e.preventDefault();

            $('body').removeClass('popup-open');
            $('.popup').hide();
        };

        $rootScope.modals = new (function() {
            var self = this;

            modals = [];

            self.count = function() {
                return modals.length;
            };

            self.push = function(modal) {
                modal.close = function(e) {
                    e && e.stopPropagation() & e.preventDefault();
                    modals.splice(modals.indexOf(modal), 1);
                };

                modals.push(modal);
            };

            self.modals = function() {
                return modals;
            };
        })();

        var fetchVoucher = function() {
            AuthService.getVoucher().then(function(response) {
                $rootScope.targetVoucher = response.data;
            });
        }

        $scope.$on('voucher:fetch', fetchVoucher);
    }
]);