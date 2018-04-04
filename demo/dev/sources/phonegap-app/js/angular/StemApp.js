var stemApp = angular.module('stemApp', ['ui.router']);

// Controllers
stemApp.controller('BaseController', require('./controllers/BaseController'));

// Providers
stemApp.provider('ApiRequest', require('./providers/ApiRequestProvider'));

// Directives
stemApp.directive('popupModal', require('./directives/PopupModalDirective'));

// Services
stemApp.service('CredentialsService', require('./services/CredentialsService'));
stemApp.service('FormBuilderService', require('./services/FormBuilderService'));
stemApp.service('AuthService', require('./services/AuthService'));
stemApp.service('VoteService', require('./services/VoteService'));

// Filters
stemApp.filter('strLimit', require('./filters/StrLimitFilter'));

// Components
stemApp.component('authComponent', require('./components/AuthComponent'));
stemApp.component('voteComponent', require('./components/VoteComponent'));

// Config providers
stemApp.config(require('./router/routes.js'));
stemApp.config(['ApiRequestProvider', function(ApiRequestProvider) {
    ApiRequestProvider.setHost(env.apiUrl);
}]);

angular.bootstrap(document.getElementById('StemApp'), ['stemApp']);

// check html5 config
if (!env.html5Mode.enable) {
    if (!document.location.hash) {
        document.location.hash = '#!/';
    }
}