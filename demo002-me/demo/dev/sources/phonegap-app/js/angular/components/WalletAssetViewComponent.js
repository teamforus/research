module.exports = {
    templateUrl: './assets/tpl/pages/wallet-asset-view.html',
    controller: [
        '$state',
        '$stateParams',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            $stateParams,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.form = {
                values: {},
                errors: {}
            };

            ctrl.submit = () => {
                AuthService.updateAsset($stateParams.assetId, ctrl.form.values).then((res) => {
                    $state.go('wallet-assets');
                }, (res) => {
                    ctrl.form.errors = res.data.errors;
                });
            };

            AuthService.assets().then((res) => {
                let asset = res.data.filter((asset) => {
                    return asset.id == $stateParams.assetId;
                })[0];

                ctrl.form.values.location = asset.location;
            }, console.log);
        }
    ]
};