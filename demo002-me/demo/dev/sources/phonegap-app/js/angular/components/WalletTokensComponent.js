module.exports = {
    templateUrl: './assets/tpl/pages/wallet-tokens.html',
    controller: [
        '$state',
        'AuthService',
        function(
            $state,
            AuthService
        ) {
            var ctrl = this;

            ctrl.sendTokens = function(token) {
                $state.go('send', {
                    data: {
                        token: token
                    }
                });
            };

            ctrl.askTokens = function(token) {
                $state.go('ask', {
                    data: {
                        token: token
                    }
                });
            };

            AuthService.tokens().then(function(res) {
                ctrl.tokens = res.data;
            }, function(res) {
                console.log(res.data);
            });
        }
    ]
};