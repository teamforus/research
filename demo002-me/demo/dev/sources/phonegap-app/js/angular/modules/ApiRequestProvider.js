planApp.provider('ApiRequest', function() {
    return new(function() {
        var host = false;

        this.setHost = function(_host) {
            while (_host[_host.length - 1] == '/')
                _host = _host.slice(0, _host.length - 1);

            host = _host;
        };

        this.$get = [
            '$q',
            '$http',
            '$timeout',
            '$rootScope',
            function(
                $q,
                $http,
                $timeout,
                $rootScope
            ) {
                var resolveUrl = function(input) {
                    console.log(input);
                    var parser = document.createElement('a');

                    parser.href = input;

                    var pathname = parser.pathname.split('/');

                    if (pathname[0] !== '')
                        pathname.unshift('');

                    return parser.protocol + '//' + parser.host + pathname.join('/');
                }

                var makeHeaders = function() {
                    return {
                        'Locale': 'nl',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
                };

                var get = function(endpoint, data, headers) {
                    return ajax('GET', endpoint, data, headers);
                };

                var post = function(endpoint, data, headers) {
                    return ajax('POST', endpoint, data, headers);
                };

                var put = function(endpoint, data, headers) {
                    return ajax('PUT', endpoint, data, headers);
                };

                var _delete = function(endpoint, data, headers) {
                    return ajax('DELETE', endpoint, data, headers);
                };

                var ajax = function(method, endpoint, data, headers, debug) {
                    var params = {};

                    if (method == 'GET') {
                        params.params = data || {};

                        for (var prop in params.params) {
                            if (Array.isArray(params.params[prop])) {
                                params.params[prop + '[]'] = params.params[prop];
                                delete params.params[prop];
                            }
                        }
                    } else {
                        params.data = data || {};
                    }

                    params.headers = Object.assign(makeHeaders());
                    params.url = resolveUrl(host + endpoint);
                    params.method = method;

                    return $q(function(done, reject) {
                        $http(params).then(function(response) {
                            done(response);
                        }, function(response) {
                            reject(response);
                        });
                    });
                };

                var endpointToUrl = function(endpoint) {
                    return resolveUrl(host + (endpoint || ''));
                };

                return {
                    get: get,
                    post: post,
                    put: put,
                    delete: _delete,
                    ajax: ajax,
                    endpointToUrl: endpointToUrl
                }
            }
        ];
    });
});