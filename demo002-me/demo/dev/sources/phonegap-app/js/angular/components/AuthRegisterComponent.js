module.exports = {
    templateUrl: './assets/tpl/pages/auth-register.html',
    controller: [
        '$state',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.std = {
                first_name: 'Jamal',
                last_name: 'Vleij',
                bsn: '12345678',
                phone: '12345678',
            };

            ctrl.form = {
                errors: {},
                values: {}
            };

            var getRandomNumber = function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            ctrl.fillStd = function() {
                ctrl.form.values = JSON.parse(JSON.stringify(ctrl.std));
                ctrl.form.values.email =  getRandomNumber(100000, 200000) + "@forus.io";
            };

            ctrl.submit = function() {
                AuthService.register(
                    ctrl.form.values
                ).then(function(res) {
                    CredentialsService.set(res.data.access_token);
                    ctrl.form.errors = {};
                    $state.go('delegates');
                }, function(res) {
                    ctrl.form.errors = res.data;
                });
            };
        }
    ]
};