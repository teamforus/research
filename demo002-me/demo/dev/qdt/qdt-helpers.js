var fs = require('fs');
var colors = require('colors');
var readline = require('readline');

// plugins: pug, sass, autoprefixer, minify-css, rename, concat and other
var plugins = require('gulp-load-plugins')();

var qdt_verbose = require('./qdt-verbose.js');

// not very sure if this work cross-frame
var isObjectLiteral = function (object) {
    return object && object.constructor && object.constructor.name === 'Object';
};

var deepExtend = function (destination, source) {
    for (var property in source) {
        if (isObjectLiteral(destination[property]) && isObjectLiteral(source[property])) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

// build list paths for specified platform
var qdtBuidAssetPaths = function (platform) {
    var _platform_libs = JSON.parse(JSON.stringify(platform.libs));
    var _platform_assets = JSON.parse(JSON.stringify(platform.assets));
    var _assets_to_move = [];

    for (var i = _platform_assets.length - 1; i >= 0; i--) {
        _platform_assets[i].from =
            './sources/' + platform.source + '/' + _platform_assets[i].from;

        _platform_assets[i].to =
            platform.paths.root + '/' + _platform_assets[i].to;
    }

    // platform specific assets from config file
    _assets_to_move = _assets_to_move.concat(_platform_assets);

    // jquery
    if (_platform_libs.jquery) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/jquery/dist/jquery.min.js',
            to: platform.paths.assets_root + '/' + 'dist/jquery/'
        }]);
    }

    // mdi
    if (_platform_libs.mdi) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/mdi/css/materialdesignicons.min.css',
            to: platform.paths.assets_root + '/' + 'dist/mdi/css/'
        }, {
            from: './node_modules/mdi/css/materialdesignicons.min.css.map',
            to: platform.paths.assets_root + '/' + 'dist/mdi/css/'
        }, {
            from: './node_modules/mdi/fonts/*',
            to: platform.paths.assets_root + '/' + 'dist/mdi/fonts/'
        }]);
    }

    // underscore
    if (_platform_libs.underscore) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/underscore/underscore-min.js',
            to: platform.paths.assets_root + '/' + 'dist/underscore/'
        }]);
    }

    // underscore.string
    if (_platform_libs['underscore.string']) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/underscore.string/dist/underscore.string.min.js',
            to: platform.paths.assets_root + '/' + 'dist/underscore.string/'
        }]);
    }

    // angular
    if (_platform_libs.angular) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/angular/angular.min.js',
            to: platform.paths.assets_root + '/' + 'dist/angular/'
        }, {
            from: './node_modules/angular/angular-csp.css',
            to: platform.paths.assets_root + '/' + 'dist/angular/'
        }]);
    }

    // bootstrap-3
    if (_platform_libs.bootstrap_3) {
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/bootstrap/dist/js/bootstrap.min.js',
            to: platform.paths.assets_root + '/' + 'dist/bootstrap/js/'
        }, {
            from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
            to: platform.paths.assets_root + '/' + 'dist/bootstrap/css/'
        }, {
            from: './node_modules/bootstrap/dist/fonts/*',
            to: platform.paths.assets_root + '/' + 'dist/bootstrap/fonts/'
        }]);
    }

    // angular-2
    if (_platform_libs.angular_2) {
        // angular 2 dependences
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/core-js/client/shim.min.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/core-js/client/'
        }, {
            from: './node_modules/zone.js/dist/zone.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/zone.js/dist/'
        }, {
            from: './node_modules/reflect-metadata/Reflect.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/reflect-metadata/'
        }, {
            from: './node_modules/rxjs/bundles/Rx.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/rxjs/bundles/'
        }]);

        // angular 2 core
        _assets_to_move = _assets_to_move.concat([{
            from: './node_modules/@angular/core/bundles/core.umd.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/@angular/core/bundles/'
        }, {
            from: './node_modules/@angular/common/bundles/common.umd.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/@angular/common/bundles/'
        }, {
            from: './node_modules/@angular/compiler/bundles/compiler.umd.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/@angular/compiler/bundles/'
        }, {
            from: './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/@angular/platform-browser/bundles/'
        }, {
            from: './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            to: platform.paths.assets_root + '/' + 'dist/@angular2/@angular/platform-browser-dynamic/bundles/'
        }]);
    }

    return _assets_to_move;
};

// show notification
var doNotify = function (title, message) {
    console.log("Error title: " + title + "\n");
    console.log("Error message: " + message + "\n");
    console.log('--- '.repeat(20) + "\n");

    plugins.notify({
        message: message,
        title: title,
        templateOptions: {
            date: new Date()
        },
        emitError: true
    }).write('');
};

var getParams = function () {
    // ignore node, gulp and task name from argv
    var _argv = process.argv.slice(3);
    var _params = {
        length: 0
    };

    _argv = _argv.forEach(function (_val) {
        // check paramether format
        if (_val.indexOf('--') !== 0 || _val.indexOf('=') === -1)
            return;

        // separate parameter name and value
        _val = _val.slice(2).split('=');
        _params[_val[0]] = _val[1];
        _params.length++;
    });

    return _params;
};

var compileConfig = function (configs, env) {
    for (var _key in configs.platforms) {
        configs.platforms[_key].name = _key;
    }

    var sample_p = configs.platforms['*'];
    var platforms = {};

    var asset_filter = function (val) {
        if (map_story.indexOf(val.from + '|' + val.to) !== -1)
            return false;

        map_story.push(val.from + '|' + val.to);
        return val;
    };

    var settings_map_js = function (item) {
        // source scss files are required
        if (typeof item.src == 'undefined')
            return console.log(colors.yellow(
                "\nError: javascript 'src' should be speficied!\n"));

        // source javascript files format
        if (typeof item.src == 'string')
            item.src = [item.src];
        else if (typeof item.src.length == 'undefined')
            item.src = [item.src];

        // destination folder (by default: "assets/js" folder)
        if (typeof item.dest == 'undefined')
            item.dest = ['/'];
        else if (typeof item.dest == 'string')
            item.dest = [item.dest];
        else if (typeof item.dest.length == 'undefined')
            item.dest = [item.dest];

        // output (compiled) file name, "app.js" by default
        if (typeof item.name == 'undefined')
            item.name = '';

        return item;
    };

    var settings_map_scss = function (item) {
        // source scss files are required
        if (typeof item.src == 'undefined')
            return console.log(colors.yellow(
                "\nError: scss 'src' should be speficied!\n"));

        // source scss files format
        if (typeof item.src == 'string')
            item.src = [item.src];
        else if (typeof item.src.length == 'undefined')
            item.src = [item.src];

        // watch included files, not required
        if (typeof item.watch == 'undefined')
            item.watch = [];
        else if (typeof item.watch == 'string')
            item.watch = [item.watch];
        else if (typeof item.watch.length == 'undefined')
            item.watch = [item.watch];

        // destination folder (by default: "assets/css" folder)
        if (typeof item.dest == 'undefined')
            item.dest = ['/'];
        else if (typeof item.dest == 'string')
            item.dest = [item.dest];
        else if (typeof item.dest.length == 'undefined')
            item.dest = [item.dest];

        // output (compiled) file name, "app.scss" by default
        if (typeof item.name == 'undefined')
            item.name = 'app.scss';

        return item;
    };

    var settings_map_pug = function (item) {
        // required to keep raw hierarchy
        if (typeof item.path == 'undefined')
            item.path = '/';

        // source scss files are required
        if (typeof item.src == 'undefined')
            return console.log(colors.yellow(
                "\nError: pug 'src' should be speficied!\n"));

        // source scss files format
        if (typeof item.src == 'string')
            item.src = [item.src];
        else if (typeof item.src.length == 'undefined')
            item.src = [item.src];

        // watch included files, not required
        if (typeof item.watch == 'undefined')
            item.watch = [];
        else if (typeof item.watch == 'string')
            item.watch = [item.watch];
        else if (typeof item.watch.length == 'undefined')
            item.watch = [item.watch];

        // destination folder (by default: root folder (one))
        if (typeof item.dest == 'undefined')
            item.dest = ['/'];
        else if (typeof item.dest == 'string')
            item.dest = [item.dest];
        else if (typeof item.dest.length == 'undefined')
            item.dest = [item.dest];

        return item;
    };

    for (var k in configs.platforms) {
        if (typeof configs.platforms[k] != 'object')
            continue;

        if (k == '*' || env.platforms.enabled.indexOf(k) == -1)
            continue;

        if (typeof env.platforms_data != 'undefined')
            configs.platforms[k].env_data = env.platforms_data[k] || false;

        if (configs.platforms[k].source == "sample") {
            console.log(colors.red('Error platform "' +
                configs.platforms[k].name + '" is using "sample" as ' +
                'it\'s source and will be disabled!\n'));
            continue;
        }

        platforms[k] = deepExtend(
            JSON.parse(JSON.stringify(sample_p)), configs.platforms[k]);

        if (typeof platforms[k].assets != 'object')
            platforms[k].assets = sample_p.assets.concat(platforms[k].assets);

        var map_story = [];

        platforms[k].assets = platforms[k].assets.filter(asset_filter);

        if (typeof platforms[k].tasks.settings.scss.length == 'undefined')
            platforms[k].tasks.settings.scss = [platforms[k].tasks.settings.scss];

        if (typeof platforms[k].tasks.settings.pug.length == 'undefined')
            platforms[k].tasks.settings.pug = [platforms[k].tasks.settings.pug];

        if (typeof platforms[k].tasks.settings.js.length == 'undefined')
            platforms[k].tasks.settings.js = [platforms[k].tasks.settings.js];

        platforms[k].tasks.settings.scss =
            platforms[k].tasks.settings.scss.map(settings_map_scss);

        platforms[k].tasks.settings.pug =
            platforms[k].tasks.settings.pug.map(settings_map_pug);

        platforms[k].tasks.settings.js =
            platforms[k].tasks.settings.js.map(settings_map_js);
    }

    configs.platforms = platforms;

    return configs;
};

var groupPlatforms = function (_platforms) {
    var grouped_platforms = {};

    // group platforms
    for (var n in _platforms) {
        if (!grouped_platforms.hasOwnProperty(_platforms[n].source))
            grouped_platforms[_platforms[n].source] = [];

        grouped_platforms[_platforms[n].source].push(_platforms[n]);
    }

    return grouped_platforms;
};

isPlatformTaskEnabled = function (disabled, task) {
    if (typeof disabled.tasks == 'undefined')
        return true;

    if (typeof disabled.tasks.disabled[task] == 'undefined')
        return true;

    if (typeof disabled.tasks.disabled[task] == 'boolean')
        return !disabled.tasks.disabled[task];

    return false;
};

var qdt_core = {
    isReady: function (envFile, verbose) {
        if (!fs.existsSync(envFile)) {
            if (verbose) {
                console.log(colors.red(
                    "Please add \"qdt-env.json\" or \"qdt-env.js\" first.\n" +
                    "Run \"gulp init\" to create it automatic."
                ));
            }

            return false;
        }

        return true;
    },
    ask: function (question) {
        return new Promise(function (resolve) {
            console.log(question);

            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: '> '
            });

            rl.prompt();

            rl.on('line', function (line) {
                line = line.trim().toUpperCase();

                // stop prompt and input stream
                rl.close();
                process.stdin.pause();

                // check answer
                if ((line == 'Y' || line == 'N'))
                    return resolve(line == 'Y');

                // ask again
                qdt_core.ask(
                    qdt_verbose.core_ask_wrong_input
                ).then(resp => resolve(resp));
            });
        });
    },
    isPlatformTaskEnabled: isPlatformTaskEnabled,
    qdtBuidAssetPaths: qdtBuidAssetPaths,
    groupPlatforms: groupPlatforms,
    compileConfig: compileConfig,
    getParams: getParams,
    doNotify: doNotify,
};

module.exports = qdt_core;