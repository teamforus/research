module.exports = {
    templateUrl: './assets/tpl/pages/wallet-passes.html',
    controller: [
        '$state',
        'AuthService',
        function(
            $state,
            AuthService
        ) {
            var ctrl = this;

            AuthService.getUser().then(function(res) {
                ctrl.stem_points = res.data.stem_points;
            });
        }
    ]
};