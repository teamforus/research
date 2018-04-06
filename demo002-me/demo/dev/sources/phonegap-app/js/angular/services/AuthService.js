module.exports = [
    'ApiRequest',
    'CredentialsService',
    function(
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            this.register = function(data) {
                return ApiRequest.post('/auth/register', data);
            };

            this.signOut = function(values) {
                CredentialsService.set(null);
            };

            this.getUser = function() {
                return ApiRequest.get('/user');
            };

            this.records = function() {
                return ApiRequest.get('/user/records');
            };

            this.tokens = function() {
                return ApiRequest.get('/user/tokens');
            };

            this.qrDetails = function(token) {
                return ApiRequest.get('/qr-code', token);
            };

            this.validateRecord = function(key) {
                return ApiRequest.post('/user/records/validate', {
                    key: key
                });
            };
        });
    }
];