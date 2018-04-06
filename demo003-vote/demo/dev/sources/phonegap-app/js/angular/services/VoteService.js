module.exports = ['ApiRequest', function(ApiRequest) {
    return new(function() {
        this.active = function(id) {
            return ApiRequest.get('/votes/active');
        };
        this.vote = function(id, vote_option_id) {
            return ApiRequest.post('/votes/' + id + '/vote', {
                'vote_option_id': vote_option_id
            });
        };
    });
}];