kindpakketApp.directive('googleMap', [
    'GoogleMapService',
    function(
        GoogleMapService
    ) {
        return {
            restrict: 'A',
            templateUrl: './assets/tpl/directives/google-map.html',
            replace: true,
            transclude: true,
            link: function($scope, iElm, iAttrs, controller) {
                $scope.style = [];
                // locations = [];
                $scope.markers = [];

                var initialize = function(obj, locations) {
                    locations = locations || [];

                    var office = locations.length ? locations[0] : false;
                    var $element = $(iElm).find('.map-canvas');
                    var contentString = $element.attr("data-string");
                    var map, marker, infowindow;
                    var image = $element.attr("data-marker");
                    var zoomLevel = 12;
                    var styledMap = new google.maps.StyledMapType($scope.style, {
                        name: "Styled Map"
                    });

                    var mapOptions = {
                        zoom: zoomLevel,
                        disableDefaultUI: false,
                        center: new google.maps.LatLng(53.261723, 6.3950947),
                        scrollwheel: true,
                        fullscreenControl: false,
                        mapTypeControlOptions: {
                            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                        }
                    }

                    map = new google.maps.Map(document.getElementById(obj), mapOptions);

                    // map.mapTypes.set('map_style', styledMap);
                    // map.setMapTypeId('map_style');

                    infowindow = new google.maps.InfoWindow();

                    locations.forEach(function(office) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(office.lat, office.lon),
                            map: map,
                            icon: image
                        });

                        $scope.markers.push(marker);

                        google.maps.event.addListener(marker, 'click', (function(marker, office) {
                            var description = [
                                'Address: ' + office.address,
                                'Telephone: ' + office.shopkeeper.phone,
                                'Categories: ' + office.shopkeeper.categories,
                            ];

                            return function() {
                                infowindow.setContent(
                                    '<div class="map-card">\
                                    <img class="map-card-img" src="' + (office.preview || 'assets/img/no-image.jpg') + '" alt=""/>\
                                    <div class="map-card-title">' + office.shopkeeper.name + '</div>\
                                    <div class="map-card-description">' + description.join('<br />') + '</div>\
                                    <div class="map-card-actions">\
                                    <!--<a class="button button-success" href="#">Apply</a>-->\
                                    </div>\
                                    </div>');
                                infowindow.open(map, marker);
                            }
                        })(marker, office));
                    });
                }

                $scope.updatePoints = function(locations) {
                    initialize('map-canvas-contact', locations);
                };

                GoogleMapService.getStyle().then(function(style) {
                    $scope.style = style.style;
                    initialize('map-canvas-contact');
                });
            }
        };
    }
]);