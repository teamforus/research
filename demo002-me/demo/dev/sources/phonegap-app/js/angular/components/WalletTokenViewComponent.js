module.exports = {
    templateUrl: './assets/tpl/pages/wallet-token-view.html',
    controller: [
        '$state',
        '$stateParams',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            $stateParams,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            if (!$stateParams.tokenId) {
                $state.go('wallet-tokens');
            }

            ctrl.targetTransaction = null;

            ctrl.account = CredentialsService.getAccount(CredentialsService.get());
            
            AuthService.tokenOverview($stateParams.tokenId).then((res) => {
                ctrl.data = res.data;

                $state.$current.data.header.title = ctrl.data.walletTokens.amount.toFixed(2);
                $state.$current.data.header.subtitle = ctrl.data.token.name;
                $state.$current.data.header.sendAndAsk.token = {
                    token: {
                        id: ctrl.data.walletTokens.token_id
                    }
                };
            }, console.log);

            ctrl.showTransaction = (transaction) => {
                ctrl.targetTransaction = transaction;
            };

            ctrl.hideTransaction = () => {
                ctrl.targetTransaction = false;
            };
        }
    ]
};