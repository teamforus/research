module.exports = {
    templateUrl: './assets/tpl/pages/share-data.html',
    controller: [
        '$state',
        '$stateParams',
        'IntentService',
        function(
            $state,
            $stateParams,
            IntentService
        ) {
            var ctrl = this;

            if (!$stateParams.data || !$stateParams.data.requested) {
                return $state.go('qr-scanner');
            }

            ctrl.showAccepted = false;
            ctrl.showDeclined = false;

            ctrl.accept = function() {
                IntentService.acceptToken($stateParams.data.token).then(function() {
                    ctrl.showAccepted = true;
                }, function(res) {
                    alert(res.data.message);
                });
            }

            ctrl.decline = function() {
                IntentService.declineToken($stateParams.data.token).then(function() {
                    ctrl.showDeclined = true;
                }, function() {
                    alert(res.data.message);
                });
            }

            ctrl.items = $stateParams.data.requested.items;
        }
    ]
};