const routes = function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state({
            url: '/logout',
            name: 'logout',
            controller: [
                '$state',
                '$rootScope',
                'CredentialsService',
                function(
                    $state,
                    $rootScope,
                    CredentialsService
                ) {
                    CredentialsService.set(null);
                    $rootScope.credentials = CredentialsService.get();
                    $state.go('auth');
                }
            ]
        })
        .state({
            url: '/',
            name: 'auth',
            component: 'authComponent',
            data: {
                title: "Auth"
            }
        })
        .state({
            url: '/vote',
            name: 'vote',
            component: 'voteComponent',
            data: {
                title: "Vote"
            }
        });
} 

module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', routes];