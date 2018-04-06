module.exports = {
    templateUrl: './assets/tpl/pages/profile.html',
    controller: [
        '$state',
        'AuthService',
        function(
            $state,
            AuthService
        ) {
            var ctrl = this;

            AuthService.getUser().then(function(res) {
                (new QRCode("qrcode")).makeCode(res.data.public_address);
            }, console.error);
        }
    ]
};