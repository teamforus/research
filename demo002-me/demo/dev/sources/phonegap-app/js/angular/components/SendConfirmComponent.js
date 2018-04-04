module.exports = {
    templateUrl: './assets/tpl/pages/send-confirm.html',
    controller: [
        '$state',
        '$stateParams',
        'TransactionService',
        function(
            $state,
            $stateParams,
            TransactionService
        ) {
            var ctrl = this;

            ctrl.showSuccess = false;

            ctrl.send = function() {;
                TransactionService.send(ctrl.params).then(function(res) {
                    ctrl.showSuccess = true;
                }, function(res) {
                    // console.log(res.data);
                });
            }

            if (!$stateParams.data) {
                $state.go('send');
            }

            ctrl.params = $stateParams.data;
        }
    ]
};