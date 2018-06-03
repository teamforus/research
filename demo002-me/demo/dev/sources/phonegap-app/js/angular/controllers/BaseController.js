var BaseController = function ($rootScope, $scope, $q, $attrs, $state, $timeout, AuthService, CredentialsService) {
    $rootScope.$state = $scope.$state = $state;
    $rootScope.$thisState = $scope.$thisState = $state.current;

    window.handleOpenURL = function(url_string) {
        setTimeout(function() {
            let selfSchemaProtocol = 'demomeapp://';
            let pathname = url_string.slice(selfSchemaProtocol.length);

            // for compatibility in ios we need to provide valid url
            let url = new URL('http://forus.io/' + pathname);
            let request = url.searchParams.get("request");

            if (url.pathname == '/auth' && request == 'StemApp') {
                $state.go('share-data-stempas', {
                    data: {
                        requested: {
                            items: [
                                'Stempas'
                            ]
                        }
                    }
                }, {
                    title: 'StemAPP',
                    subtitle: 'Share your voting pass',
                });
            } else if (url.pathname == '/authorize-email') {
                let source = url.searchParams.get("source");
                let token = url.searchParams.get("token");

                AuthService.authorizeAuthEmailToken(source, token).then((res) => {
                    CredentialsService.add(res.data.access_token, "");
                    CredentialsService.set(res.data.access_token);

                    AuthService.getName().then((name) => {
                        CredentialsService.update(res.data.access_token, name);
                        $state.go('records');
                    }, console.log);
                    $state.go('records');
                }, (res) => {
                    alert("Authorization failed: " . res.data.message);
                });
            }
        }, 100);
    };

    var checkConnection = function() {
        if (window.Connection &&
            navigator.connection.type == window.Connection.NONE) {
            alert('No internet connection!');
            $timeout(checkConnection, 1000);
        }
    };

    $timeout(function() {
        checkConnection();

        document.addEventListener("offline", function() {
            $timeout(checkConnection, 0);
        }, false);

        document.addEventListener("online", function() {
            $state.reload();
        }, false);
    }, 1000);
};

module.exports = ['$rootScope', '$scope', '$q', '$attrs', '$state', '$timeout', 'AuthService', 'CredentialsService', BaseController];