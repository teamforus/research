module.exports = {
    templateUrl: './assets/tpl/pages/share-data.html',
    controller: [
        '$state',
        '$stateParams',
        'IntentService',
        'AuthService',
        function(
            $state,
            $stateParams,
            IntentService,
            AuthService
        ) {
            var ctrl = this;

            if (!$stateParams.data || !$stateParams.data.requested) {
                return $state.go('qr-scanner');
            }

            ctrl.showAccepted = false;
            ctrl.showDeclined = false;

            ctrl.accept = function() {
                AuthService.authorizeAuthToken($stateParams.data.value).then(function() {
                    ctrl.showAccepted = true;
                }, function(res) {
                    alert(res.data.message);
                });
            }

            ctrl.decline = function () {
                ctrl.showDeclined = true;
            }

            ctrl.items = $stateParams.data.requested.items;
        }
    ]
};