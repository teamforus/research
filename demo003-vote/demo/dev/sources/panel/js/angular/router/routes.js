const routes = function($stateProvider, $urlRouterProvider, $locationProvider) {
    if (env.html5Mode.enable) {
        $locationProvider.html5Mode(true);
    }

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
                    $state.go('landing');
                }
            ]
        })
        .state({
            url: '/',
            name: 'landing',
            component: 'landingComponent',
            data: {
                title: "Home"
            }
        })
        .state({
            url: '/votes',
            name: 'votes',
            component: 'voteListComponent',
            data: {
                title: "Vote list"
            }
        })
        .state({
            url: '/votes/create',
            name: 'vote-create',
            component: 'voteCreateComponent',
            data: {
                title: "Vote create"
            }
        })
        .state({
            url: '/votes/:id/edit',
            name: 'vote-edit',
            component: 'voteEditComponent',
            data: {
                title: "Vote edit"
            }
        })
        .state({
            url: '/votes/:id',
            name: 'vote-view',
            component: 'voteViewComponent',
            data: {
                title: "Vote view"
            }
        });
} 

module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', routes];