kindpakketApp.service('CategoryService', ['$http', '$q', 'ApiRequest', function($http, $q, ApiRequest) {
    var getCategories = function() {
        return $q(function(resolve, reject) {
            $http.get('/assets/json/categories.json').then(resolve, reject);
        });
    };

    return {
        getCategories: getCategories
    };
}]);