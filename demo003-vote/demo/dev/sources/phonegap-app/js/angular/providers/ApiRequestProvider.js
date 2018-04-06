module.exports = function() {
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
            '$state',
            '$rootScope',
            'CredentialsService',
            function(
                $q,
                $http,
                $state,
                $rootScope,
                CredentialsService
            ) {
                var resolveUrl = function(input) {
                    var parser = document.createElement('a');

                    parser.href = input;

                    var pathname = parser.pathname.split('/');

                    if (pathname[0] !== '')
                        pathname.unshift('');

                    return parser.protocol + '//' + parser.host + pathname.join('/');
                }

                var makeHeaders = function() {
                    var credentails = CredentialsService.get();

                    return {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Token': CredentialsService.get(),
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

                    params.data = data || {};
                    params.headers = Object.assign(makeHeaders(), headers || {});

                    params.url = resolveUrl(host + endpoint);
                    params.method = method;

                    return $q(function(done, reject) {
                        $http(params).then(function(response) {
                            done(response);
                        }, function(response) {
                            if (response.status == 401) {
                                $state.go('logout');
                            }

                            reject(response);
                        });
                    });
                };

                return {
                    get: get,
                    put: put,
                    post: post,
                    delete: _delete,
                    ajax: ajax,
                }
            }
        ];
    });
};