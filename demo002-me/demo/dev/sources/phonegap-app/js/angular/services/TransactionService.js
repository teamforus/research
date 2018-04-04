module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.validateSendRequest = function(data) {
                return ApiRequest.post('/transaction/send/validate', data);
            };

            this.send = function(data) {
                return ApiRequest.post('/transaction/send', data);
            };

            this.ask = function(data) {
                return ApiRequest.post('/transaction/ask', data);
            };

            this.askCheck = function(data) {
                return ApiRequest.post('/transaction/ask/check', data);
            };

            this.askAccept = function(data) {
                return ApiRequest.post('/transaction/ask/accept', data);
            };;

            this.askDecline = function(data) {
                return ApiRequest.post('/transaction/ask/decline', data);
            };;
        });
    }
];