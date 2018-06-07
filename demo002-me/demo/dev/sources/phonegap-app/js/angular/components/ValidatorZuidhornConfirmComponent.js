module.exports = {
    templateUrl: './assets/tpl/pages/validator-zuidhorn-confirm.html',
    controller: [
        '$state', 
        '$timeout',
        '$stateParams',
        'AuthService',
        'RecordsService',
        function(
            $state,
            $timeout,
            $stateParams,
            AuthService,
            RecordsService
        ) {
            var ctrl = this;

            ctrl.showSuccess = false;
            ctrl.record = {};

            RecordsService.readValidationView($stateParams.data.token).then((res) => {
                if (res.data.state != 'pending') {
                    $state.go('qr-scanner');
                } else {
                    ctrl.record = res.data;
                }
            }, console.log);

            ctrl.acceptSubmit = () => {
                RecordsService.acceptValidation($stateParams.data.token).then((res) => {
                    console.log(res.data);
                    ctrl.showSuccess = true;
                }, console.log);
            };

            ctrl.declineSubmit = () => {
                RecordsService.declineValidation($stateParams.data.token).then((res) => {
                    console.log(res.data);
                    ctrl.showSuccess = true;
                }, console.log);
            };
        }
    ]
};