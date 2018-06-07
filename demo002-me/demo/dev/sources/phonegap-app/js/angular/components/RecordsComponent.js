module.exports = {
    templateUrl: './assets/tpl/pages/records.html',
    controller: [
        '$state',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            AuthService.records().then(function(res) {
                ctrl.records = res.data;
                ctrl.recordCount = Object.keys(ctrl.records).length;
            }, console.log);

            ctrl.show = false;

            ctrl.validate = function(record) {
                if (record.valid)
                    return;

                $state.go('validators', {
                    data: {
                        record: record
                    }
                });
            };
        }
    ]
};