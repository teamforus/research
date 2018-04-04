module.exports = [function() {
    return {
        restrict: 'A',
        templateUrl: './assets/templates/directives/popup-modal.html',
        replace: true,
        transclude: true,
        scope: {
            modal: "="
        },
        link: function($scope, iElm, iAttrs, controller) {}
    };
}];