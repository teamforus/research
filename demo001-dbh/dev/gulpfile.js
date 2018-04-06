// file system
var fs = require('fs');

// console colors
var colors = require('colors');

// qdt helper
var qdt_core = require("./qdt/qdt-helpers");
var qdt_verbose = require("./qdt/qdt-verbose");

// gulp itself
var gulp = require('gulp');

// check env existence
if (fs.existsSync('./qdt-env.json')) {
    // environment
    var qdt_e = require('./qdt-env.json');

    // configurations
    var qdt_c = qdt_core.compileConfig(require('./qdt-config.js'), qdt_e);

    // group platform by source
    var grouped_platforms = qdt_core.groupPlatforms(qdt_c.platforms);

    // plugins: pug, sass, autoprefixer, minify-css, rename, concat and other
    var plugins = require('gulp-load-plugins')();

    // stream combiner 
    var streamCombiner = require('stream-combiner');

    // browser syncronization
    var browserSync = require('browser-sync').create();
    var browserSyncReload = browserSync.reload;

    // typescript required libs
    var browserify = require("browserify");
    var vinyl_source = require('vinyl-source-stream');
    var vinyl_buffer = require('vinyl-buffer');
    var tsify = require("tsify");

    var params = qdt_core.getParams();

    var pluginSettings = {
        autoPrefixer: {
            browfsers: ['> 1%', 'IE >= 8'],
            cascade: false
        },
        browserSyncReload: {
            stream: true
        },
        pug: {
            pretty: true
        }
    };
}

// test required
if (typeof process.argv[2] == 'undefined' || process.argv[2] != 'init') {
    if (!qdt_core.isReady(true))
        process.exit(0);
}

// serve processing
gulp.task('server', function() {

    if (typeof qdt_c.platforms[qdt_e.server.platform] == 'undefined')
        return console.log(colors.red(qdt_verbose.serv_plat_unknown));

    if (!qdt_c.platforms[qdt_e.server.platform].server)
        return console.log(colors.red(qdt_verbose.serv_path_unknown));

    var platform = qdt_c.platforms[qdt_e.server.platform];
    var path = platform.paths.root + platform.server.path;
    var port = platform.paths.port || false;

    var server = {
        server: path,
        notify: true,
        open: false
    };

    if (port)
        server.port = port;

    browserSync.init(server);
});

// cleaner
gulp.task('clean', [], function() {
    for (var k in qdt_c.platforms) {
        if (qdt_e.platforms.enabled.indexOf(qdt_c.platforms[k].name) === -1)
            continue;
        if (!qdt_c.platforms[k].paths.clean_paths)
            continue;

        gulp.src(qdt_c.platforms[k].paths.clean_paths, {
            read: false
        }).pipe(plugins.clean({
            force: true
        }));
    }
});

gulp.task('source:add', function() {
    if (params.length === 0 || typeof params.name == 'undefined')
        return console.log(colors.red(qdt_verbose.source_add_unk_name));

    fs.exists("./sources/" + params.name, function(exists) {
        if (exists)
            return console.log(colors.red(qdt_verbose.source_add_exists_name));

        gulp.src('./sources/sample/**/**').pipe(
            gulp.dest('./sources/' + params.name));

        console.log(colors.green(
            qdt_verbose.source_add_done.replace('[name]', params.name)));
    });
});

gulp.task('source:remove', function() {
    if (params.length === 0 || typeof params.name == 'undefined')
        return console.log(colors.red(qdt_verbose.source_remove_unk_name));

    if (params.name == 'sample')
        return console.log(colors.red(qdt_verbose.source_remove_sample_name));

    fs.exists("./sources/" + params.name, function(exists) {
        if (!exists)
            return console.log(colors.red(qdt_verbose.source_remove_not_found_name.replace('[name]', params.name)));

        gulp.src("./sources/" + params.name, {
            read: false
        }).pipe(plugins.clean({
            force: true
        }));

        console.log(colors.green(
            qdt_verbose.source_remove_done.replace('[name]', params.name)));
    });
});

var scss_compiler = function(platform, src, dest, name) {
    if (!qdt_core.isPlatformTaskEnabled(platform, 'scss'))
        return;

    // notifiers
    var _doNotify = function(val) {
        qdt_core.doNotify('SCSS - Error', val);
    };

    var streams = [];

    streams.push(gulp.src(src));
    streams.push(plugins.sass());
    streams.push(plugins.autoprefixer(pluginSettings.autoPrefixer));
    streams.push(plugins.cleanCss());
    streams.push(plugins.rename(name));
    streams.push(gulp.dest(platform.paths.assets_root + '/css/' + dest));

    if (qdt_e.server.enabled && (qdt_e.server.watch_platforms == "all" ||
            qdt_e.server.watch_platforms.indexOf(platform.name) !== -1))
        streams.push(browserSyncReload(pluginSettings.browserSyncReload));

    streamCombiner.apply(streamCombiner, streams).on('error', _doNotify);
};

var js_compiler = function(platform, src, dest, name) {
    if (!qdt_core.isPlatformTaskEnabled(platform, 'js'))
        return;

    var streams = [];

    // notifiers
    var _doNotify = function(val) {
        qdt_core.doNotify('JavaScript - Error', val);
    };

    for (var i = dest.length - 1; i >= 0; i--) {
        streams.push(gulp.src(src.slice().reverse()));

        if (name)
            streams.push(plugins.concat(name));

        streams.push(gulp.dest(platform.paths.assets_root + '/js/' + dest[i]));

        if (qdt_e.server.enabled && (qdt_e.server.watch_platforms == "all" ||
                qdt_e.server.watch_platforms.indexOf(platform.name) !== -1))
            streams.push(browserSyncReload(pluginSettings.browserSyncReload));

        streamCombiner.apply(streamCombiner, streams).on('error', _doNotify);
    }
};

var ts_compiler = function(source) {
    // notifiers
    var _doNotify = function(val) {
        qdt_core.doNotify('TypeScript - Error', val);
    };

    var _grouped_platforms = grouped_platforms[source].filter(function(item) {
        return !qdt_core.isPlatformTaskEnabled(item.tasks.disabled, 'ts');
    });

    if (_grouped_platforms.length === 0)
        return false;

    var streams = [
        browserify({
            basedir: '.',
            debug: true,
            entries: ['./sources/' + source + '/ts/app.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify).transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle(),
        vinyl_source('app-ts.js'),
        vinyl_buffer(),
        plugins.sourcemaps.init({
            loadMaps: true
        }),
        plugins.uglify(),
        plugins.sourcemaps.write('./'),
    ];

    _grouped_platforms.map(function(item) {
        streams.push(gulp.dest(item.paths.assets_root + '/js'));
    });

    if (qdt_e.server.enabled && (qdt_e.server.watch_platforms == "all" ||
            qdt_e.server.watch_platforms.indexOf(item.name) !== -1))
        streams.push(browserSyncReload(pluginSettings.browserSyncReload));

    streamCombiner.apply(streamCombiner, streams).on('error', _doNotify);
};

var assets_compiler = function(source) {
    // notifiers
    var _doNotify = function(val) {
        qdt_core.doNotify('Assets - Error', val);
    };

    var _grouped_platforms = grouped_platforms[source].filter(function(item) {
        if (typeof item.tasks.disabled.assets == 'object') {
            if (item.tasks.disabled.assets.indexOf('assets') != -1)
                return false;
        }

        return item;
    });

    if (_grouped_platforms.length === 0)
        return false;

    _grouped_platforms.map(function(item) {
        var list_assets = qdt_core.qdtBuidAssetPaths(item);

        for (var i = list_assets.length - 1; i >= 0; i--) {
            streamCombiner(
                gulp.src(list_assets[i].from),
                plugins.newer(list_assets[i].to),
                gulp.dest(list_assets[i].to)
            ).on('error', _doNotify);
        }
    });
};

var jade_compiler = function(source, platform, src, dest) {
    if (!qdt_core.isPlatformTaskEnabled(platform, 'pug'))
        return;

    // notifiers
    var _doNotify = function(val) {
        qdt_core.doNotify('Pug - Error', val);
    };

    var streams = [];

    streams.push(gulp.src(src, {
            base: source
        }),
        plugins.jade(Object.assign(pluginSettings.pug, {
            data: {
                qdt_c: {
                    platform: platform
                }
            }
        })),
        gulp.dest(platform.paths.root + dest));

    if (qdt_e.server.enabled && (qdt_e.server.watch_platforms == "all" ||
            qdt_e.server.watch_platforms.indexOf(platform.name) !== -1))
        streams.push(browserSyncReload(pluginSettings.browserSyncReload));

    streamCombiner(streams).on('error', _doNotify);
};

// scss task
gulp.task('scss', [], function() {
    var _iif_scss = function(_k_scss, platform, group) {
        var _path = 'sources/' + _k_scss + '/scss/';

        scss_compiler(platform, _path + group.src, group.dest, group.name);
    };

    // scss
    for (var k_scss in grouped_platforms) {
        for (var _a = grouped_platforms[k_scss].length - 1; _a >= 0; _a--) {
            var _scss_s = grouped_platforms[k_scss][_a].tasks.settings.scss;

            for (var _aa = _scss_s.length - 1; _aa >= 0; _aa--) {
                (_iif_scss)(k_scss, grouped_platforms[k_scss][_a],
                    grouped_platforms[k_scss][_a].tasks.settings.scss[_aa]);
            }
        }
    }
});

// javascript task
gulp.task('js', [], function() {
    var _iif_js = function(_k_js, platform, group) {
        var _path = 'sources/' + _k_js + '/js/';
        var _raw_src = [];

        if (typeof group.src == "string")
            group.src = [group.src];

        for (var i = group.src.length - 1; i >= 0; i--)
            _raw_src.push(_path + group.src[i]);

        js_compiler(platform, _raw_src, group.dest, group.name);
    };

    // js
    for (var k_js in grouped_platforms) {
        for (var _b = grouped_platforms[k_js].length - 1; _b >= 0; _b--) {
            var _js_s = grouped_platforms[k_js][_b].tasks.settings.js;

            for (var _ba = _js_s.length - 1; _ba >= 0; _ba--) {
                (_iif_js)(k_js, grouped_platforms[k_js][_b],
                    grouped_platforms[k_js][_b].tasks.settings.js[_ba]);
            }
        }
    }
});

// typescript task
gulp.task('ts', [], function() {
    for (var k in grouped_platforms) {
        ts_compiler(k);
    }
});

// typescript task
gulp.task('assets', [], function() {
    for (var k in grouped_platforms) {
        assets_compiler(k);
    }
});

// pug task
gulp.task('pug', [], function() {
    var _iif = function(_k_pug, platform, group) {
        var _raw_src = [];
        var _path = 'sources/' + _k_pug + '/pug/';

        for (var i = group.src.length - 1; i >= 0; i--)
            _raw_src.push(_path + group.src[i]);

        jade_compiler(
            __dirname + '/' + _path + '/' + group.path,
            platform,
            _raw_src,
            group.dest);
    };

    // pug (ex. jade)
    for (var k_pug in grouped_platforms) {
        for (var i = grouped_platforms[k_pug].length - 1; i >= 0; i--) {
            var _pug_s = grouped_platforms[k_pug][i].tasks.settings.pug;

            for (var j = _pug_s.length - 1; j >= 0; j--) {
                (_iif)(k_pug, grouped_platforms[k_pug][i],
                    grouped_platforms[k_pug][i].tasks.settings.pug[j]);
            }
        }
    }
});

// warch processing
gulp.task('watch', ['server'], function() {
    var _iif_scss = function(_k_scss, platform, group) {
        var _watch_src = [];
        var _path = 'sources/' + _k_scss + '/scss/';

        group.src = _path + group.src;

        if (typeof group.watch == "string")
            group.watch = [group.watch];

        for (var j = group.watch.length - 1; j >= 0; j--)
            _watch_src.push(_path + group.watch[j]);

        gulp.watch(group.src, function() {
            scss_compiler(platform, group.src, group.dest, group.name);
        });

        gulp.watch(_watch_src, function() {
            scss_compiler(platform, group.src, group.dest, group.name);
        });
    };

    var _iif_ts = function(_k_ts) {
        gulp.watch('./sources/' + _k_ts + '/ts/*.ts', function(src) {
            ts_compiler(_k_ts);
        });
    };

    var _iif_assets = function(_k_assets, _assets) {
        for (var __i = 0; __i < _assets.length; __i++) {
            gulp.watch('./sources/' + _k_assets + '/' + _assets[__i].from, function(src) {
                assets_compiler(_k_assets);
            });
        }
    };

    var _iif_js = function(_k_js, platform, group) {
        var _path = 'sources/' + _k_js + '/js/';
        var _raw_src = [];

        if (typeof group.src == "string")
            group.src = [group.src];

        for (var i = group.src.length - 1; i >= 0; i--)
            _raw_src.push(_path + group.src[i]);

        gulp.watch(_raw_src, function(src) {
            js_compiler(platform, _raw_src, group.dest, group.name);
        });
    };

    var _iif_pug = function(_k_pug, platform, group) {
        var _raw_src = [];
        var _watch_src = [];

        var _path = 'sources/' + _k_pug + '/pug/';

        if (typeof group.src == "string")
            group.src = [group.src];

        for (var i = group.src.length - 1; i >= 0; i--)
            _raw_src.push(_path + group.src[i]);

        if (typeof group.watch == "string")
            group.watch = [group.watch];

        for (var j = group.watch.length - 1; j >= 0; j--)
            _watch_src.push(_path + group.watch[j]);

        gulp.watch(_raw_src, function(src) {
            jade_compiler(
                __dirname + '/' + _path + '/' + group.path,
                platform,
                src.path,
                group.dest);
        });

        gulp.watch(_watch_src, function(src) {
            jade_compiler(
                __dirname + '/' + _path + '/' + group.path,
                platform,
                _raw_src,
                group.dest);
        });
    };

    // scss
    for (var k_scss in grouped_platforms) {
        for (var _a = grouped_platforms[k_scss].length - 1; _a >= 0; _a--) {
            var _scss_s = grouped_platforms[k_scss][_a].tasks.settings.scss;

            for (var _aa = _scss_s.length - 1; _aa >= 0; _aa--) {
                (_iif_scss)(k_scss, grouped_platforms[k_scss][_a],
                    grouped_platforms[k_scss][_a].tasks.settings.scss[_aa]);
            }
        }
    }

    // js
    for (var k_js in grouped_platforms) {
        for (var _b = grouped_platforms[k_js].length - 1; _b >= 0; _b--) {
            var _js_s = grouped_platforms[k_js][_b].tasks.settings.js;

            for (var _ba = _js_s.length - 1; _ba >= 0; _ba--) {
                (_iif_js)(k_js, grouped_platforms[k_js][_b],
                    grouped_platforms[k_js][_b].tasks.settings.js[_ba]);
            }
        }
    }
    // typescript
    for (var k_ts in grouped_platforms)
        (_iif_ts)(k_ts);

    // assets
    for (var k_assets in grouped_platforms) {
        for (var _c = grouped_platforms[k_assets].length - 1; _c >= 0; _c--) {
            for (var k_assets in grouped_platforms)
                (_iif_assets)(k_assets, grouped_platforms[k_assets][_c].assets);
        }
    }

    // pug (ex. jade)
    for (var k_pug in grouped_platforms) {
        for (var i = grouped_platforms[k_pug].length - 1; i >= 0; i--) {
            var _pug_s = grouped_platforms[k_pug][i].tasks.settings.pug;

            for (var j = _pug_s.length - 1; j >= 0; j--) {
                (_iif_pug)(k_pug, grouped_platforms[k_pug][i],
                    grouped_platforms[k_pug][i].tasks.settings.pug[j]);
            }
        }
    }
});

// initialize qdt on fresh install
gulp.task('init', function(done) {
    (new Promise(function(resolve) {
        resolve(fs.existsSync('./qdt-env.json'));
    })).then(function(exists) {
        return new Promise(function(resolve) {
            // environment configs not exists
            if (!exists) return resolve(null);

            // ask to override
            qdt_core.ask(
                qdt_verbose.task_init_env_exists, true).then(resolve);
        });
    }).then(function(resp) {
        if (resp === false)
            return console.log(qdt_verbose.task_init_keep_env) && done();

        if (resp === null)
            console.log(qdt_verbose.task_init_gen_env);

        if (resp === true)
            console.log(qdt_verbose.task_init_override_env);

        // create env config file
        fs.FileReadStream('./qdt-env.sample.json')
            .pipe(fs.FileWriteStream('./qdt-env.json'));

        done();
    });

});

// warch processing
gulp.task('compile', ['scss', 'pug', 'js', 'ts', 'assets']);

// default task
gulp.task('default', ['compile', 'watch', 'server']);