var stemAppPanel = angular.module('stemAppPanel', ['ng-sortable', 'ui.router']);

// Controllers
stemAppPanel.controller('BaseController', require('./controllers/BaseController'));

// Providers
stemAppPanel.provider('ApiRequest', require('./providers/ApiRequestProvider'));

// Directives
stemAppPanel.directive('popupModal', require('./directives/PopupModalDirective'));

// Services
stemAppPanel.service('CredentialsService', require('./services/CredentialsService'));
stemAppPanel.service('FormBuilderService', require('./services/FormBuilderService'));
stemAppPanel.service('AuthService', require('./services/AuthService'));
stemAppPanel.service('VoteService', require('./services/VoteService'));

// Filters
stemAppPanel.filter('strLimit', require('./filters/StrLimitFilter'));

// Components
stemAppPanel.component('landingComponent', require('./components/LandingComponent'));
stemAppPanel.component('voteListComponent', require('./components/VoteListComponent'));
stemAppPanel.component('voteCreateComponent', require('./components/VoteCreateComponent'));
stemAppPanel.component('voteViewComponent', require('./components/VoteViewComponent'));
stemAppPanel.component('voteEditComponent', require('./components/VoteEditComponent'));

// Config providers
stemAppPanel.config(require('./router/routes.js'));
stemAppPanel.config(['ApiRequestProvider', function(ApiRequestProvider) {
    ApiRequestProvider.setHost(env.apiUrl);
}]);

angular.bootstrap(document.getElementById('StemAppPanel'), ['stemAppPanel']);

// check html5 config
if (!env.html5Mode.enable) {
    if (!document.location.hash) {
        document.location.hash = '#!/';
    }
}