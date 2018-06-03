module.exports = [
    'ApiRequest',
    'CredentialsService',
    function(
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            this.makeAuthToken = () => {
                return ApiRequest.post('/identity/proxy/token');
            };

            this.checkAccessToken = (access_token) => {
                return ApiRequest.get('/identity/status', {}, {
                    'Authorization': 'Bearer ' + access_token
                }, false);
            };

            this.signOut = function(values) {
                CredentialsService.set(null);
            };
        });
    }
];