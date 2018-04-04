const apiUrl = "http://kindpakket-api.dev-rminds.nl/api/";

module.exports = {
    // browsersync configs
    server: {
        enabled: true,
        // choose, which platform should be served
        // you can serve few platforms at the same time, 
        // but make sure each of them use unique port number
        platform: [
            "panel", 
            "panel-markup", 
            "phonegap",
            "phonegap-markup"
        ],
        // browsersync reloads browser when watched files are modified,
        // here you can choose which platform besides "served" will make 
        // browsersync to reload. 
        // Sometimes "served" platform rely on foreign platform
        watch_platforms: "all"
    },
    platforms: {
        // choose which platforms will be enabled, otherwise completely ignored
        enabled: [
            "panel", 
            "panel-markup", 
            "phonegap",
            "phonegap-markup"
        ]
    },
    data: {
        panel: {
            html5Mode: {
                enable: true,
                basePath: '/'
            },
            apiUrl: apiUrl
        },
        'panel-markup': {
            html5Mode: {
                enable: false,
                basePath: '/'
            },
            apiUrl: apiUrl
        },
        phonegap: {
            html5Mode: {
                enable: false,
                basePath: '/'
            },
            apiUrl: apiUrl
        },
        'phonegap-markup': {
            html5Mode: {
                enable: false,
                basePath: '/'
            },
            apiUrl: apiUrl
        },
    }
};