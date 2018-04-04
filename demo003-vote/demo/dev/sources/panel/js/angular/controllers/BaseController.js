module.exports = [
    '$scope',
    '$state',
    '$rootScope',
    'AuthService',
    'FormBuilderService',
    'CredentialsService',
    function(
        $scope,
        $state,
        $rootScope,
        AuthService,
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

        var initProgress = function() {
            // https://kimmobrunfeldt.github.io/progressbar.js/
            if ($('[progress]')[0]) {
                (new ProgressBar.Circle($('[progress]')[0], {
                    color: '#FFEA82',
                    trailColor: '#eee',
                    trailWidth: 1,
                    duration: 1400,
                    easing: 'bounce',
                    strokeWidth: 5,
                    from: {
                        color: '#70c567',
                        a: 0
                    },
                    to: {
                        color: '#70c567',
                        a: 1
                    },
                    // Set default step function for all animate calls
                    step: function(state, circle) {
                        circle.path.setAttribute('stroke', state.color);
                    }
                })).set(1);
            }
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

            var checkForUpdate = function(intentToken) {
                AuthService.getIntentCodeState(intentToken).then(function(res) {
                    if (res.data.state == 'authorized') {
                        AuthService.intentToAccessToken(intentToken).then(function(res) {
                            $rootScope.auth.step = $rootScope.auth.step + 2;
                            CredentialsService.set(res.data.access_token);
                            $rootScope.credentials = CredentialsService.get();
                            $rootScope.$broadcast('voucher:fetch');

                            setTimeout(function() {
                                initProgress();
                            }, 200);

                            setTimeout(function() {
                                $rootScope.auth.closeModals();
                                $rootScope.auth.step = 1;
                                $state.go('votes');
                            }, 2000);
                        });
                    } else if (res.data.state == 'declined') {
                        $rootScope.auth.closeModals();
                    } else if (res.data.state == 'pending') {
                        setTimeout(function() {
                            checkForUpdate(intentToken);
                        }, 2000);
                    }
                });
            }

            AuthService.getIntentCode().then(function(res) {
                $('#auth_qr').text('');
                (new QRCode("auth_qr")).makeCode(
                    res.data.token
                );

                setTimeout(function() {
                    checkForUpdate(res.data.token);
                }, 2000);
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

        $rootScope.auth.closeModals = function(e) {
            e && e.stopPropagation() & e.preventDefault();

            $('body').removeClass('popup-open');
            $('.popup').hide();
        };


        window.modals = $rootScope.modals = new(function() {
            var self = this;

            var modals = [];

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
    }
];