app.directive('searchOfferts', ['SearchService', function(SearchService) {
    // Runs during compile
    return {
        templateUrl: '/tpl/search-offerts.html',
        replace: false,
        restrict: 'CA',
        link: function($scope, iElm, iAttrs, controller) {},
        controller: function($scope, $element, $attrs, $transclude) {
            $scope.timer = false;
            $scope.searchInput = $attrs.search || '';
            $scope.results = [];

            $scope.submit = function() {};

            $scope.hideResults = function() {
                $scope.results = [];
            };

            $scope.showResults = function(data) {
                $scope.results = data;
            };

            $scope.$watch('searchInput', function(n, o, s) {
                if (n == $attrs.search)
                    return delete $attrs.search;

                if ($scope.timer)
                    clearTimeout($scope.timer);

                if (!n)
                    return $scope.hideResults();

                $scope.timer = setTimeout(function() {
                    SearchService.doSearch({
                        query: n
                    }).then(function(resp) {
                        $scope.showResults(resp.data);
                    });
                }, 1000);
            });
        },
    };
}]);