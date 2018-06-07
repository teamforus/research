module.exports = {
    platforms: {
        "*": {
            "source": "base",
            "libs": {
                // please disable libraries you don't need
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": false,
                "underscore.string": false,
                "mdi": true
            },
            "libs_data": {},
            // overwrite this paths in your platform
            "paths": {
                "root": false,
                "assets_root": false,
                "clean_paths": false
            },
            // add here libraries from node_modules
            "assets": [{
                "from": "resources/assets/**/*",
                "to": "assets"
            }, {
                "from": "../../node_modules/sortablejs/Sortable.min.js",
                "to": "assets/dist/sortablejs"
            }, {
                "from": "../../node_modules/chart.js/dist/Chart.min.js",
                "to": "assets/dist/chart.js"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.min.js",
                "to": "assets/dist/qrcodejs"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }],
            // browsersync configurations (ex: ip, port and path)
            "server": false,
            // tasks configs
            "tasks": {
                // disable tasks
                "disabled": {
                    "pug": false,
                    "js": false,
                    "assets": false
                },
                // tasks details, ex: source, destination, minify and etc. 
                "settings": {
                    "js": [{
                        "src": [
                            "angular-1/modules/**/*",
                            "angular-1/components/**/*",
                            "angular-1/controllers/**/*",
                            "angular-1/directives/**/*",
                            "angular-1/providers/**/*",
                            "angular-1/filters/**/*",
                            // "app.ts",
                            "app.js"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": false
                    }, {
                        "src": [
                            // "raw/**/*.js"
                        ],
                        "dest": "/raw",
                        "path": "/raw",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": false
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["*.pug"],
                        "watch": ["layout/**/*.pug"],
                        "path": "/"
                    }, {
                        "path": "/raw/tpl",
                        "src": ["raw/**/*.pug"],
                        "path": "/tpl"
                    }]
                }
            }
        },
        "panel-markup": {
            "source": "panel",
            "paths": {
                "root": "../panel-markup",
                "assets_root": "../panel-markup/assets",
                "clean_paths": [
                    "../panel-markup"
                ]
            },
            // tasks configs
            "tasks": {
                // disable tasks
                "disabled": {
                    "pug": false,
                    "js": false,
                    "assets": false
                },
                // tasks details, ex: source, destination, minify and etc. 
                "settings": {
                    "js": [{
                        "src": [
                            "app-markup.js"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": false
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/markup",
                        "src": ["markup/*.pug"],
                        "watch": ["layout/**/*.pug"],
                    }]
                }
            },
            "server": {
                "path": "/",
                "port": 3000
            }
        },
        "panel": {
            "source": "panel",
            "paths": {
                "root": "../panel",
                "assets_root": "../panel/assets",
                "clean_paths": [
                    "../panel"
                ]
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "resources/.htaccess",
                "to": ""
            }, {
                "from": "../../node_modules/sortablejs/Sortable.min.js",
                "to": "assets/dist/sortablejs"
            }, {
                "from": "../../node_modules/chart.js/dist/Chart.min.js",
                "to": "assets/dist/chart.js"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.min.js",
                "to": "assets/dist/qrcodejs"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/angular-legacy-sortablejs/angular-legacy-sortable.js",
                "to": "assets/dist/sortablejs/js/"
            }],
            "tasks": {
                // tasks details, ex: source, destination, minify and etc. 
                "settings": {
                    "js": [{
                        "src": [
                            "angular/StemAppPanel.js",
                            "app.js"
                        ],
                        "watch": [
                            "angular/**/*"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": true
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["index.pug"],
                        "watch": ["layout/**/*.pug"],
                        "dest": "/"
                    }, {
                        "path": "/",
                        "src": ["templates/**/*.pug"],
                        "dest": "/assets"
                    }]
                },
            },
            "server": {
                "path": "/",
                "port": 3500
            }
        },
        "phonegap-markup": {
            "source": "phonegap-app",
            "paths": {
                "root": "../phonegap-markup",
                "assets_root": "../phonegap-markup/assets",
                "clean_paths": [
                    "../phonegap-markup"
                ]
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }],
            // tasks configs
            "tasks": {
                // disable tasks
                "disabled": {
                    "pug": false,
                    "js": false,
                    "assets": false
                },
                // tasks details, ex: source, destination, minify and etc. 
                "settings": {
                    "js": [{
                        "src": [
                            "app-markup.js"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": false
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/markup",
                        "src": ["markup/*.pug"],
                        "watch": ["layout/**/*.pug"],
                    }]
                }
            },
            "server": {
                "path": "/",
                "port": 4000
            }
        },
        "phonegap": {
            "source": "phonegap-app",
            "paths": {
                "root": "../phonegap/www",
                "assets_root": "../phonegap/www/assets",
                "clean_paths": [
                    "../phonegap/www"
                ]
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }],
            "tasks": {
                "settings": {
                    "js": [{
                        "src": [
                            "angular/StemApp.js",
                            "app.js"
                        ],
                        "watch": [
                            "angular/**/*"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": true
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["index.pug"],
                        "watch": ["layout/**/*.pug"],
                        "dest": "/"
                    }, {
                        "path": "/",
                        "src": ["templates/**/*.pug"],
                        "dest": "/assets"
                    }]
                },
            },
            "server": {
                "path": "/",
                "port": 4500
            }
        },
        "php": {
            "paths": {
                "root": "../php/public",
                "assets_root": "../php/public/assets",
                "clean_paths": [
                    "../php/public/assets",
                    "../php/public/raw"
                ]
            },
            "tasks": {
                "settings": {
                    "pug": [{
                        "path": "/raw/tpl",
                        "src": ["raw/**/*.pug"],
                        "dest": "/tpl"
                    }]
                }
            }
        }
    }
};