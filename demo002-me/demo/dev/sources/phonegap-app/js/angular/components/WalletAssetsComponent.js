module.exports = {
    templateUrl: './assets/tpl/pages/wallet-assets.html',
    controller: [
        '$state',
        'AuthService',
        function(
            $state,
            AuthService
        ) {
            var ctrl = this;

            AuthService.assets().then((res) => {
                ctrl.assets = res.data;
            }, console.log);
        }
    ]
};