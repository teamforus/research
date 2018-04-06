module.exports = {
    templateUrl: './assets/tpl/pages/share-data-stempas.html',
    controller: [
        '$state',
        '$stateParams',
        'CredentialsService',
        function(
            $state,
            $stateParams,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.items = $stateParams.data.requested.items;

            ctrl.respond = function(accept) {
                if (accept) {
                    window.open('demostemapp://login?accessToken=' + CredentialsService.get(), '_system');
                } else {
                    window.open('demostemapp://login-declined', '_system');
                }
            };
        }
    ]
};