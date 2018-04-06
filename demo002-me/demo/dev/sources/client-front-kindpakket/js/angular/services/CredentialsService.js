kindpakketApp.service('CredentialsService', [function() {
    return new(function() {
        this.set = function(credentails) {
            return localStorage.setItem('access_token', JSON.stringify(credentails));
        };

        this.get = function() {
            return JSON.parse(localStorage.getItem('access_token'));
        };
    });
}]);