module.exports = ['ApiRequest', function(ApiRequest) {
    return new(function() {
        this.list = function() {
            return ApiRequest.get('/votes');
        };

        this.read = function(id) {
            return ApiRequest.get('/votes/' + id);
        };

        this.store = function(data) {
            return ApiRequest.post('/votes', data);
        };

        this.update = function(id, data) {
            return ApiRequest.put('/votes/' + id, data);
        };

        this.destroy = function(id) {
            return ApiRequest.delete('/votes/' + id);
        };

        this.activate = function(id) {
            return ApiRequest.post('/votes/' + id + '/activate');
        };
    });
}];