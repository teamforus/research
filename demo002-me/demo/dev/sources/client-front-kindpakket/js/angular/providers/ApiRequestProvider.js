kindpakketApp.provider('ApiRequest', function() {
    return new (function () {
        var host = false;

        this.setHost = function (_host) {
            while (_host[_host.length - 1] == '/')
                _host = _host.slice(0, _host.length - 1);

            host = _host;
        };

        this.$get = [
            '$q',
            '$http',
            '$state',
            '$timeout',
            '$rootScope',
            'CredentialsService',
            function (
                $q,
                $http,
                $state,
                $timeout,
                $rootScope,
                CredentialsService
            ) {
                var resolveUrl = function (input) {
                    var parser = document.createElement('a');

                    parser.href = input;

                    var pathname = parser.pathname.split('/');

                    if (pathname[0] !== '')
                        pathname.unshift('');

                    return parser.protocol + '//' + parser.host + pathname.join('/');
                }

                var makeHeaders = function () {
                    return {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + CredentialsService.get(),
                    };
                };

                var get = function (endpoint, data, headers, auth_redirect) {
                    return ajax('GET', endpoint, data, headers, auth_redirect);
                };

                var post = function (endpoint, data, headers, auth_redirect) {
                    return ajax('POST', endpoint, data, headers, auth_redirect);
                };

                var patch = function (endpoint, data, headers, auth_redirect) {
                    return ajax('PATCH', endpoint, data, headers, auth_redirect);
                };

                var put = function (endpoint, data, headers, auth_redirect) {
                    return ajax('PUT', endpoint, data, headers, auth_redirect);
                };

                var _delete = function (endpoint, data, headers, auth_redirect) {
                    return ajax('DELETE', endpoint, data, headers, auth_redirect);
                };

                var ajax = function (method, endpoint, data, headers, auth_redirect) {
                    var params = {};


                    if (typeof auth_redirect == 'undefined') {
                        auth_redirect = true;
                    }
                    console.log('auth_redirect', auth_redirect);

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

                    params.headers = Object.assign(makeHeaders(), headers);
                    params.url = resolveUrl(host + endpoint);
                    params.method = method;

                    return $q(function (done, reject) {
                        $http(params).then(function (response) {
                            done(response);
                        }, function (response) {
                            if ((response.status == 401) && auth_redirect) {
                                CredentialsService.set(null);
                                $state.go('landing', {}, {reload: true});
                            }

                            reject(response);
                        });
                    });
                };

                var endpointToUrl = function (endpoint) {
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