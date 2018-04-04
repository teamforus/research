module.exports = [function() {
    return new(function() {
        this.set = function(access_token) {
            console.log('setItem', access_token);
            return localStorage.setItem("access_token", JSON.stringify(access_token));
        };

        this.get = function() {
            return JSON.parse(localStorage.getItem("access_token"));
        };
    });
}];