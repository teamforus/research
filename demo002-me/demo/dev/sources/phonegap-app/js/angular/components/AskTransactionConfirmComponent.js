module.exports = {
    templateUrl: './assets/tpl/pages/ask-transaction-confirm.html',
    controller: [
        '$state', 
        '$timeout',
        '$stateParams',
        'AuthService',
        'TransactionService',
        function(
            $state,
            $timeout,
            $stateParams,
            AuthService,
            TransactionService
        ) {
            var ctrl = this;

            if (!$stateParams.data ||
                ($stateParams.data.state != 'pending')) {
                return $state.go('qr-scanner');
            }

            ctrl.showAccepted = false;
            ctrl.showDeclined = false;

            ctrl.accept = function() {
                TransactionService.askAccept($stateParams.data).then(function() {
                    ctrl.showAccepted = true;
                }, function(res) {
                    alert(res.data.message);
                });
            }

            ctrl.decline = function() {
                TransactionService.askDecline($stateParams.data).then(function() {
                    ctrl.showDeclined = true;
                }, function(res) {
                    alert(res.data.message);
                });
            }

            ctrl.transaction = $stateParams.data;
        }
    ]
};