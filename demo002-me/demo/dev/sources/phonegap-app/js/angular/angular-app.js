var meApp = angular.module('meApp', ['ui.router', 'ui.router.state.events']);

// Controllers
meApp.controller('BaseController', require('./controllers/BaseController'));

// Providers
meApp.provider('ApiRequest', require('./providers/ApiRequestProvider'));

// Directives
meApp.directive('accountFooter', require('./directives/AccountFooterDirective.js'));
meApp.directive('accountSwitcher', require('./directives/AccountSwitcherDirective.js'));
meApp.directive('viewHeaderPinCode', require('./directives/ViewHeaderPinCodeDirective.js'));

// Services
meApp.service('AuthService', require('./services/AuthService'));
meApp.service('IntentService', require('./services/IntentService'));
meApp.service('CredentialsService', require('./services/CredentailsService'));
meApp.service('TransactionService', require('./services/TransactionService'));
meApp.service('QrScannerService', require('./services/QrScannerService'));
meApp.service('RecordsService', require('./services/RecordsService'));

// Filters
// none

// Components
meApp.component('welcomeComponent', require('./components/WelcomeComponent'));
meApp.component('authComponent', require('./components/AuthComponent'));
meApp.component('delegatesComponent', require('./components/DelegatesComponent'));
meApp.component('authRegisterComponent', require('./components/AuthRegisterComponent'));
meApp.component('authRegisterPinCodeComponent', require('./components/AuthRegisterPinCodeComponent'));
meApp.component('authRestoreComponent', require('./components/AuthRestoreComponent'));

meApp.component('infoComponent', require('./components/InfoComponent'));
meApp.component('infoDelegatesComponent', require('./components/InfoDelegatesComponent'));

meApp.component('recordsComponent', require('./components/RecordsComponent'));
meApp.component('walletVouchersComponent', require('./components/WalletVouchersComponent'));
meApp.component('walletVoucherViewComponent', require('./components/WalletVoucherViewComponent'));
meApp.component('walletAssetsComponent', require('./components/WalletAssetsComponent'));
meApp.component('walletAssetViewComponent', require('./components/WalletAssetViewComponent'));
meApp.component('walletTokensComponent', require('./components/WalletTokensComponent'));
meApp.component('walletTokenViewComponent', require('./components/WalletTokenViewComponent'));

meApp.component('profileComponent', require('./components/ProfileComponent'));
meApp.component('shareDataComponent', require('./components/ShareDataComponent'));
meApp.component('shareDataStempasComponent', require('./components/ShareDataStempasComponent.js'));

meApp.component('validatorsComponent', require('./components/ValidatorsComponent'));
meApp.component('validatorDigIdComponent', require('./components/ValidatorDigIdComponent'));
meApp.component('validatorZuidhornComponent', require('./components/ValidatorZuidhornComponent'));
meApp.component('validatorZuidhornConfirmComponent', require('./components/ValidatorZuidhornConfirmComponent'));

meApp.component('askComponent', require('./components/AskComponent'));
meApp.component('askQrCodeComponent', require('./components/AskQrCodeComponent'));
meApp.component('askTransactionConfirmComponent', require('./components/AskTransactionConfirmComponent'));
meApp.component('sendComponent', require('./components/SendComponent'));
meApp.component('sendAddressComponent', require('./components/SendAddressComponent'));
meApp.component('paymentConfirmationComponent', require('./components/PaymentConfirmationComponent'));
meApp.component('qrScannerComponent', require('./components/QrScannerComponent'));
meApp.component('qrScannerSendComponent', require('./components/QrScannerSendComponent'));
meApp.component('sendConfirmComponent', require('./components/SendConfirmComponent.js'));

meApp.component('voucherTransactionComponent', require('./components/VoucherTransactionComponent'));

// Config providers
meApp.config(require('./routes/router.js'));

meApp.config(['ApiRequestProvider', function(ApiRequestProvider) {
    ApiRequestProvider.setHost(qdt_c.platform.env_data.apiUrl);
}]);

meApp.run(['$rootScope', '$state', 'CredentialsService', function($rootScope, $state, CredentialsService) {
    var noAuth = [
        '', 'auth', 'info', 'auth-register', 'auth-restore', 'welcome'
    ];

    var onlyNoAuth = [
        'auth'/* , 'auth-register', 'auth-restore' */
    ];

    // $stateChangeStart
    $rootScope.$on('$stateChangeSuccess', function() {
        if (noAuth.indexOf($state.current.name) == -1) {
            if (!CredentialsService.get()) {
                return $state.go('auth');
            }
        }

        if (onlyNoAuth.indexOf($state.current.name) != -1) {
            if (!!CredentialsService.get()) {
                return $state.go('records');
            }
        }
    });
}]);

angular.bootstrap(document.getElementById('meApp'), ['meApp']);