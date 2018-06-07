module.exports = [function () {
    return {
        templateUrl: './assets/tpl/directives/account-switcher.html',
        controller: ["$scope", "$state", "CredentialsService", function ($scope, $state, CredentialsService) {
            $scope.showOptions = false;
            $scope.accounts = CredentialsService.getAccounts();
            $scope.account = CredentialsService.getAccount(CredentialsService.get());

            $scope.showOptionsBtn = () => {
                $scope.showOptions = true;
            };

            $scope.hideOptionsBtn = () => {
                $scope.showOptions = false;
            };

            $scope.selectAccount = (access_token) => {
                CredentialsService.set(access_token);
                $state.go($state.$current.name, {}, {reload: true});
            };
        }]
    };
}];