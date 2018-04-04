var svg_icons = require('./svg-icons-list.json');

var JadeData = function(laravel_output) {
    this.svg_icons = svg_icons;
    this.svgIcon = function(name, classes, x, y) {
        if (laravel_output)
            return "{!! svgIcon('" + name + "', '" + (classes || '') + "', " + (x || 'FALSE') + ", " + (y || 'FALSE') + ") !!}";

        x = x || 50;
        y = y || 50;
        classes = classes || '';

        if (classes.length > 0)
            classes = ' ' + classes;

        var svg_icon = svg_icons[name];
        var attributes = 'class="svg-icon svg-' + name + classes + '" ';

        /*attributes += x ? ('width="' + x + '" ') : ''; 
        attributes += y ? ('height="' + y + '" ') : ''; */

        attributes += (x && y) ? ('viewBox="0 0 ' + x + ' ' + y + '" ') : '';
        attributes += 'version="1.1"';

        return svg_icon.replace("<svg>", '<svg ' + attributes + '>');
    };
};

var jade_data = new JadeData();

module.exports = {
    "platforms": {
        "*": {
            "source": "base",
            "libs": {
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": false,
                "underscore.string": false,
                "mdi": true
            },
            "paths": {
                "root": false,
                "assets_root": false,
                "clean_paths": false
            },
            "assets": [{
                "from": "resources/assets/**/*",
                "to": "assets"
            }, {
                "from": "../../node_modules/chosen-npm/public/chosen.jquery.min.js",
                "to": "assets/dist/chosen"
            }, {
                "from": "../../node_modules/chosen-npm/public/chosen-sprite.png",
                "to": "assets/dist/chosen"
            }, {
                "from" : "../../node_modules/js-cookie/src/js.cookie.js",
                "to" : "assets/dist/js-cookie"
            }],
            "server": false,
            "libs_data": {
                'jade': jade_data
            },
            "tasks": {
                "disabled": {
                    "pug": false,
                    "ts": true,
                    "js": false,
                    "assets": false
                },
                "settings": {
                    "js": [{
                        "src": [
                            "angular/app-ng.js",
                            "angular/app-ng-services.js",
                            "angular/app-ng-filters.js",
                            "angular/app-ng-directives.js",
                            "angular/app-ng-controllers.js",
                            "app-google-maps.js",
                            "app-simple-anim.js",
                            "app.js"
                        ],
                        "dest": "/",
                        "name": "app.js"
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "dest": "/",
                        "name": "style.min.css"
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["*.jade"],
                        "watch": ["layout/**/*.jade"],
                        "dest": "/"
                    }, {
                        "path": "/",
                        "src": ["tpl/**/*.jade"],
                        "dest": "/"
                    }]
                }
            }
        },
        "html": {
            "source": "base",
            "paths": {
                "root": "../html",
                "assets_root": "../html/assets",
                "clean_paths": [
                    "../html"
                ]
            },
            "server": {
                "path": "/",
                "port": 3000
            }
        },
        "express": {
            "source": "base",
            "paths": {
                "root": "../",
                "assets_root": "../public/assets",
                "clean_paths": [
                    "../public/assets"
                ]
            },
            "assets": [{
                "from": "resources/assets/**/*",
                "to": "/public/assets"
            }, {
                "from": "../../node_modules/chosen-npm/public/chosen.jquery.min.js",
                "to": "/public/assets/dist/chosen"
            }, {
                "from": "../../node_modules/chosen-npm/public/chosen-sprite.png",
                "to": "/public/assets/dist/chosen"
            }, {
                "from" : "../../node_modules/js-cookie/src/js.cookie.js",
                "to" : "/public/assets/dist/js-cookie"
            }],
            "tasks": {
                "disabled": {
                    "pug": false,
                    "ts": true,
                    "js": false,
                    "assets": false
                },
                "settings": {
                    "js": [{
                        "src": [
                            "angular/app-ng.js",
                            "angular/app-ng-services.js",
                            "angular/app-ng-filters.js",
                            "angular/app-ng-directives.js",
                            "angular/app-ng-controllers.js",
                            "app-google-maps.js",
                            "app-simple-anim.js",
                            "app.js"
                        ],
                        "dest": "/",
                        "name": "app.js"
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "dest": "/",
                        "name": "style.min.css"
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["tpl/**/*.jade"],
                        "dest": "/public/"
                    }]
                }
            }
        }
    }
};