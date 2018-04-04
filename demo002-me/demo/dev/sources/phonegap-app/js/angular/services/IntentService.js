module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.readToken = function(token) {
                return ApiRequest.get('/intent/read/' + token);
            };

            this.acceptToken = function(token) {
                return ApiRequest.post('/intent/accept/' + token);
            };

            this.declineToken = function(token) {
                return ApiRequest.post('/intent/decline/' + token);
            };
        });
    }
];