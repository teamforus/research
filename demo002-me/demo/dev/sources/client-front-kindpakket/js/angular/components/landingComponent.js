kindpakketApp.component('landingComponent', {
    templateUrl: './assets/tpl/pages/landing.html',
    controller: [
        '$rootScope',
        '$scope',
        '$state',
        'CategoryService',
        'CredentialsService',
        function(
            $rootScope,
            $scope,
            $state,
            CategoryService,
            CredentialsService
        ) {
            var ctrl = this;

            $('[tabulation]').tabulation();
            $('[slow-scroll]').slowScroll();
            $(".nano").nanoScroller();

            ctrl.categories = [];

            ctrl.selectAll = function(e) {
                e && e.stopPropagation() & e.preventDefault();

                ctrl.categories.forEach(function(el) {
                    el.selected = true;
                });
            };

            ctrl.deselectAll = function(e, category) {
                e && e.stopPropagation() & e.preventDefault();

                ctrl.categories.forEach(function(el) {
                    el.selected = false;
                });
            };

            ctrl.selectCategory = function(e, category) {
                e && e.stopPropagation() & e.preventDefault();

                category.selected = !category.selected;

                ctrl.updateOfficesCategory(e)
            };

            ctrl.updateOfficesCategory = function(e) {
                e && e.stopPropagation() & e.preventDefault();

                var locations = {};

                var categories = ctrl.categories.filter(function(category) {
                    return category.selected;
                });
                
                if (categories.length == 0)
                    categories = ctrl.categories;

                categories.forEach(function(category) {
                    category.shopkeepers.forEach(function(shopkeeper) {
                        shopkeeper.offices.forEach(function(office) {
                            if (locations[office.id])
                                return;

                            locations[office.id] = JSON.parse(JSON.stringify(office));
                            locations[office.id].shopkeeper = JSON.parse(JSON.stringify(shopkeeper));
                            locations[office.id].category = JSON.parse(JSON.stringify(category));
                        });
                    });
                });

                ctrl.locations = Object.values(locations);

                ctrl.locations.forEach(function(location) {
                    location.selected = false;
                });

                if ($scope.updatePoints)
                    $scope.updatePoints(ctrl.locations);
            };

            ctrl.selectLocation = function(e, location) {
                e && e.stopPropagation() & e.preventDefault();

                var selected = location.selected;

                ctrl.locations.forEach(function(location) {
                    location.selected = false;
                });

                location.selected = !selected;

                if (location.selected) {
                    if ($scope.updatePoints)
                        $scope.updatePoints([location]);
                } else {
                    ctrl.updateOfficesCategory();
                }
            };

            CategoryService.getCategories().then(function(response) {
                ctrl.categories = response.data;
                ctrl.deselectAll();
                ctrl.updateOfficesCategory();
            }, console.log);

            if ($rootScope.credentials) {
                $rootScope.$broadcast('voucher:fetch');
            }
        }
    ]
});