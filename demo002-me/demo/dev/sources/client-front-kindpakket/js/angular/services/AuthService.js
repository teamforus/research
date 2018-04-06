kindpakketApp.service('AuthService', [
    'ApiRequest',
    'CredentialsService',
    function(
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            apiRequest = ApiRequest;

            this.signOut = function(values) {
                CredentialsService.set(null);
            };

            this.getUser = function() {
                return ApiRequest.get('/user');
            };

            this.getVoucher = function() {
                return ApiRequest.get('/user/voucher');
            };

            this.getQrCode = function() {
                return ApiRequest.get('/user/voucher/qr-code');
            };

            this.getIntentCode = function() {
                return ApiRequest.get('/auth/token');
            }

            this.getIntentCodeState = function(token) {
                return ApiRequest.post('/auth/token/check', {
                    token: token
                });
            }

            this.intentToAccessToken = function(token) {
                return ApiRequest.post('/auth/token/exchange', {
                    token: token
                });
            }
        });
    }
]);