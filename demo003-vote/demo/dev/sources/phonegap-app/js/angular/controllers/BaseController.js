module.exports = [
    '$scope',
    '$rootScope',
    '$timeout',
    '$state',
    'CredentialsService',
    function(
        $scope,
        $rootScope,
        $timeout,
        $state,
        CredentialsService
    ) {
        window.handleOpenURL = function(url_string) {
            $timeout(function() {
                let selfSchemaProtocol = 'demostemapp://';
                let pathname = url_string.slice(selfSchemaProtocol.length);

                // for compatibility in ios we need to provide valid url
                let url = new URL('http://forus.io/' + pathname);
                let request = url.searchParams.get("request");

                if (url.pathname == '/login') {
                    CredentialsService.set(url.searchParams.get("accessToken"));
                    $state.go('vote');
                } else if (url.pathname == '/login-declined') {
                    $rootScope.modals.push({
                        icon: ['mdi-close-circle-outline'],
                        title: 'Declined',
                        desc: 'Authorization declined!',
                        type: 'danger',
                        confirm: function() {
                            $state.go('logout');
                        }
                    });
                }
            }, 100);
        };

        var checkConnection = function() {
            if (window.Connection &&
                navigator.connection.type == window.Connection.NONE) {
                $rootScope.modals.push({
                    icon: ['mdi-close-circle-outline'],
                    title: 'Error!',
                    desc: 'No internet connection!',
                    type: 'danger',
                    confirmText: 'Retry',
                    confirm: function() {
                        $state.go('logout');
                        checkConnection();
                    }
                });
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

        $rootScope.modals = new(function() {
            var self = this;

            var modals = [];

            self.count = function() {
                return modals.length;
            };

            self.push = function(modal) {
                if (typeof modal.vibrate == 'undefined' || (modal.vibrate > 0)) {
                    if (typeof modal.vibrate == 'undefined') {
                        modal.vibrate = 250;
                    }

                    navigator.vibrate(modal.vibrate);
                }

                modal.close = function(e) {
                    e && e.stopPropagation() & e.preventDefault();
                    modals.splice(modals.indexOf(modal), 1);
                };

                modals.push(modal);
            };

            self.modals = function() {
                return modals;
            };
        })();
    }
];