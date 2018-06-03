module.exports = ['ApiRequest', function(ApiRequest) {
    return new(function() {
        this.list = function() {
            return ApiRequest.get('/identity/votes');
        };

        this.read = function(id) {
            return ApiRequest.get('/identity/votes/' + id);
        };

        this.store = function(data) {
            return ApiRequest.post('/identity/votes', data);
        };

        this.update = function(id, data) {
            return ApiRequest.put('/identity/votes/' + id, data);
        };

        this.destroy = function(id) {
            return ApiRequest.delete('/identity/votes/' + id);
        };

        this.activate = function(id) {
            return ApiRequest.post('/identity/votes/' + id + '/activate');
        };
    });
}];