module.exports = [
    '$q',
    'ApiRequest',
    'CredentialsService',
    function(
        $q,
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            this.makeValidationIntent = (recordId) => {
                return ApiRequest.post('/identity/records/validate/intent/' + recordId);
            };

            this.readValidationView = (intentToken, recordId) => {
                return ApiRequest.get('/identity/records/validate/intent/' + intentToken);
            };

            this.acceptValidation = (intentToken, recordId) => {
                return ApiRequest.post('/identity/records/validate/intent/' + intentToken + '/accept');
            };

            this.declineValidation = (intentToken, recordId) => {
                return ApiRequest.post('/identity/records/validate/intent/' + intentToken + '/decline');
            };
        });
    }
];