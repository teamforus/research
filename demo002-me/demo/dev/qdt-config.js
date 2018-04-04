var global_assets = [{
    "from": "resources/assets/**/*",
    "to": "assets"
}, {
    "from": "../../node_modules/sweetalert/dist/sweetalert.min.js",
    "to": "assets/dist/sweetalert/"
}, {
    "from": "../../node_modules/sweetalert/dist/sweetalert.css",
    "to": "assets/dist/sweetalert/"
}, {
    "from": "../../node_modules/papaparse/papaparse.min.js",
    "to": "assets/dist/papaparse/"
}, {
    "from": "../../node_modules/angular-sanitize/angular-sanitize.min.js",
    "to": "assets/dist/angular-sanitize"
}, {
    "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
    "to": "assets/dist/@uirouter/angularjs"
}, {
    "from": "../../node_modules/file-saver/FileSaver.min.js",
    "to": "assets/dist/file-saver"
}, {
    "from": "../../node_modules/jshashes/hashes.min.js",
    "to": "assets/dist/jshashes"
}, {
    "from": "../../node_modules/core-js/client/core.min.js",
    "to": "assets/dist/core-js"
}];

module.exports = {
    "platforms": {
        "*": {
            "source": "base",
            "libs": {
                "jquery": true,
                "bootstrap_3": true,
                "angular": true,
                "angular_2": false,
                "underscore": true,
                "underscore.string": false,
                "mdi": true
            },
            "libs_data": {},
            "paths": {
                "root": false,
                "assets_root": false,
                "clean_paths": false
            },
            "assets": global_assets,
            "server": false,
            "tasks": {
                "disabled": {
                    "pug": false,
                    "ts": true,
                    "js": false,
                    "assets": false
                },
                "settings": {
                    "less": [],
                    "js": [{
                        "src": [
                            "app.js",
                            "angular/*.js",
                            "angular/controllers/**/**.js",
                            "angular/components/**/**.js",
                            "angular/directives/**/**.js",
                            "angular/services/**/**.js",
                            "angular/filters/**/**.js"
                        ],
                        "dest": "/",
                        "name": "app.js"
                    }, {
                        "path": "/raw",
                        "src": "raw/**/*.js",
                        "dest": "/"
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": "includes/**/*.scss",
                        "dest": "/",
                        "name": "style.min.css"
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["*.pug"],
                        "watch": ["layout/**/*.pug"],
                        "dest": "/"
                    }, {
                        "path": "/raw/tpl",
                        "src": ["raw/**/*.pug"],
                        "dest": "/assets/tpl"
                    }]
                }
            }
        },
        "client-front-kindpakket": {
            "source": "client-front-kindpakket",
            "paths": {
                "root": "../client-front-kindpakket",
                "assets_root": "../client-front-kindpakket/assets",
                "clean_paths": [
                    "../client-front-kindpakket"
                ]
            },
            "libs": {
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": false,
                "underscore.string": false,
                "mdi": true
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "resources/.htaccess",
                "to": ""
            }, {
                "from": "../../node_modules/angular-sanitize/angular-sanitize.min.js",
                "to": "assets/dist/angular-sanitize"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/nanoscroller/bin/javascripts/jquery.nanoscroller.js",
                "to": "assets/dist/nanoscroller"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }, {
                "from": "../../node_modules/core-js/client/core.min.js",
                "to": "assets/dist/core-js"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.min.js",
                "to": "assets/dist/qrcodejs"
            }],
            "tasks": {
                "settings": {
                    "js": [{
                        "src": [
                            "app.js",
                            "angular/*.js",
                            "angular/controllers/**/**.js",
                            "angular/components/**/**.js",
                            "angular/directives/**/**.js",
                            "angular/providers/**/**.js",
                            "angular/services/**/**.js",
                            "angular/filters/**/**.js"
                        ],
                        "dest": "/",
                        "name": "app.js"
                    }]
                }
            },
            "server": {
                "path": "/",
                "port": 3500
            }
        },
        "phonegap": {
            "source": "phonegap-app",
            "paths": {
                "root": "../phonegap/www",
                "assets_root": "../phonegap/www/assets",
                "clean_paths": [
                    "../phonegap/www/*"
                ]
            },
            "libs": {
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": false,
                "underscore.string": false,
                "mdi": true
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "../../node_modules/angular-sanitize/angular-sanitize.min.js",
                "to": "assets/dist/angular-sanitize"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/nanoscroller/bin/javascripts/jquery.nanoscroller.js",
                "to": "assets/dist/nanoscroller"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }, {
                "from": "../../node_modules/core-js/client/core.min.js",
                "to": "assets/dist/core-js"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.min.js",
                "to": "assets/dist/qrcodejs"
            }],
            "tasks": {
                "settings": {
                    "js": [{
                        "src": [
                            "app.js",
                            "angular/*.js",
                            "angular/controllers/**/**.js",
                            "angular/components/**/**.js",
                            "angular/directives/**/**.js",
                            "angular/providers/**/**.js",
                            "angular/services/**/**.js",
                            "angular/filters/**/**.js",
                            "angular/routes/**/**.js"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": true
                    }],
                    "pug": [{
                        "path": "/",
                        "src": ["index.pug"],
                        "watch": ["layout/**/*.pug"],
                        "dest": "/"
                    }, {
                        "path": "/raw/tpl",
                        "src": ["raw/**/*.pug"],
                        "dest": "/assets/tpl"
                    }]
                }
            },
            "server": false
        },
        "phonegap-html": {
            "source": "phonegap-app",
            "paths": {
                "root": "../phonegap-html",
                "assets_root": "../phonegap-html/assets",
                "clean_paths": [
                    "../phonegap-html"
                ]
            },
            "libs": {
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": false,
                "underscore.string": false,
                "mdi": true
            },
            "assets": [{
                "from": "resources/**/*",
                "to": ""
            }, {
                "from": "../../node_modules/angular-sanitize/angular-sanitize.min.js",
                "to": "assets/dist/angular-sanitize"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/stateEvents.min.js",
                "to": "assets/dist/@uirouter/angularjs"
            }, {
                "from": "../../node_modules/nanoscroller/bin/javascripts/jquery.nanoscroller.js",
                "to": "assets/dist/nanoscroller"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }, {
                "from": "../../node_modules/core-js/client/core.min.js",
                "to": "assets/dist/core-js"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.min.js",
                "to": "assets/dist/qrcodejs"
            }],
            "tasks": {
                "settings": {
                    "js": [{
                        "src": [
                            "app.js",
                            "angular/*.js",
                            "angular/controllers/**/**.js",
                            "angular/components/**/**.js",
                            "angular/directives/**/**.js",
                            "angular/providers/**/**.js",
                            "angular/services/**/**.js",
                            "angular/filters/**/**.js",
                            "angular/routes/**/**.js"
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": true,
                        "sourcemap": true,
                        "browserify": true
                    }]
                }
            },
            "server": {
                "path": "/",
                "port": 4000
            }
        }
    }
}