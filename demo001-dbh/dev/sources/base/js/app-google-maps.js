$.prototype.mapPlugin = function(args) {
    if (this.length === 0 && typeof google != 'undefined')
        return;

    var maps = [];

    var mapPlugin = function($node) {
        var map_options;
        var markers;
        var map;
        var map_view;

        var pointer_slug = "map-point-" + ($node.data('mark') ? $node.data('mark') : '');

        var sample_marker = {
            position: args.markerPosition || [0, 0],
            title: args.markerTitle || '',
            content: args.markerContent || '',
            labelContent: args.markerLabelContent || "",
            icon: args.markerIcon || './assets/img/' + pointer_slug + '.png',
            labelClass: args.markerLabelClass || "labels",
            labelStyle: args.markerLabelStyle || {
                opacity: 1
            }
        };

        // basic options for a simple Google Map
        // for more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

        this.load = function() {
            map.setOptions(map_options);

            // let's also add a marker while we're at it
            markers.map(function(_marker) {
                var __marker = {};

                $.extend(__marker, sample_marker, _marker);

                __marker.position = new google.maps.LatLng(
                    __marker.position[0],
                    __marker.position[1]);

                __marker.map = map;

                return __marker;
            }).forEach(function(_marker) {
                var marker = new google.maps.Marker(_marker);

                if (!_marker.content)
                    return;

                var infowindow = new google.maps.InfoWindow({
                    content: '<div class="map-marker-content">' +
                        _marker.content + '</div>'
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        };

        this.bind = function() {
            google.maps.event.addDomListener(window, 'load', this.load);
        };

        this.init = function() {

            map_view = args.map_view || [0, 0];

            if ($node.data('map-view'))
                map_view = $node.data('map-view');

            map_zoom = args.map_zoom || 10;

            if ($node.data('map-view'))
                map_zoom = $node.data('map-zoom');

            map_options = {
                // how zoomed in you want the map to start at (always required)
                zoom: map_zoom,

                // the latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(map_view[0], map_view[1]),
                disableDefaultUI: false,

                // how you would like to style the map. 
                // this is where you would paste any style found on Snazzy Maps.
                styles: [{
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [{
                        "lightness": "42"
                    }, {
                        "visibility": "on"
                    }, {
                        "hue": "#ff0000"
                    }, {
                        "saturation": "-100"
                    }, {
                        "gamma": "0.78"
                    }, {
                        "weight": "0.37"
                    }, {
                        "invert_lightness": true
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 45
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#3ec7c9"
                    }, {
                        "visibility": "on"
                    }]
                }]
            };

            // create the Google Map using our element and options defined above
            map = new google.maps.Map($node[0], map_options);

            // extend map options
            map_options = $.extend({
                draggable: true,
                zoomControl: true,
                scrollwheel: false,
                disableDoubleClickZoom: false
            }, args.map_options || {});

            // extend markers
            markers = args.markers || [];

            if ($node.data('markers'))
                markers = markers.concat($node.data('markers'));

            // bind events
            this.bind();
        };

        this.init();
    };

    for (var i = this.length - 1; i >= 0; i--) {
        maps.push(new mapPlugin($(this[i])));
    }
};