app.service('SearchService', ['$http', function($http) {
    return {
        doSearch: function(data) {
            return $http.get('/search/api', {
                url: '/search/api',
                params: data,
                method: 'GET'
            });
        }
    };
}]);