kindpakketApp.component('accountViewComponent', {
    templateUrl: './assets/tpl/pages/account-view.html',
    controller: [
        '$rootScope',
        '$state',
        'AuthService',
        'CredentialsService',
        function(
            $rootScope,
            $state,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;
            var interval = false;

            if (!$rootScope.credentials)
                return $state.go('landing');

            ctrl.loadQrCode = function(e) {
                e && e.stopPropagation() & e.preventDefault();

                AuthService.getQrCode().then(function(response) {
                    ctrl.qrCode = response.data;
                });
            };

            ctrl.printQrCode = function(e) {
                e && e.stopPropagation() & e.preventDefault();

                var PrintElem = function PrintElem(html)
                {
                    var mywindow = window.open('', 'PRINT', 'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,height=700,width=1200');

                    mywindow.document.write(
                        '<html><head></head><body>' + html + '</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    mywindow.print();
                    mywindow.close();

                    return true;
                }

                if (ctrl.qrCode)
                    PrintElem('<img src="' + ctrl.qrCode + '" style="width: 50%; maring-left: 25%; display: block;">');
            };
        
            if ($rootScope.credentials) {
                ctrl.loadQrCode();
                $rootScope.$broadcast('voucher:fetch');

                interval = setInterval(function() {
                    $rootScope.$broadcast('voucher:fetch');
                }, 2000);
            }


            ctrl.$onDestroy = function () {
                if (interval) {
                    clearInterval(interval);
                }
            };
        }
    ]
});