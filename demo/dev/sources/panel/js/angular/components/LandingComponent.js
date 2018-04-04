var controller = function($rootScope, $scope, $state, CredentialsService) {
    if (!!CredentialsService.get()) {
        $state.go('votes');
    }
};

module.exports = {
    templateUrl: './assets/templates/pages/landing.html',
    controller: ['$rootScope', '$scope', '$state', 'CredentialsService', controller]
};