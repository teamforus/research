module.exports = {
    templateUrl: './assets/tpl/pages/welcome.html',
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

            var loadAuth = function() {
                if ($state.current.name == 'welcome') {
                    $state.go('auth');
                }
            }

            $timeout(function() {
                if (CredentialsService.get()) {
                    AuthService.getUser().then(function() {
                        if ($state.current.name == 'welcome') {
                            $state.go('records');
                        }
                    }, function() {
                        loadAuth();
                    });
                } else {
                    loadAuth();
                }
            }, 2000);
        }
    ]
};