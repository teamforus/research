module.exports = [function() {
    return {
        templateUrl: './assets/tpl/directives/view-header-pincode.html',
        controller: ["$scope", "$rootScope", "$element", "$timeout", function ($scope, $rootScope, $element, $timeout) {
            var digits = [];
            var validInputs = [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace"
            ];

            var updateAndBroadcast = () => {
                $scope.digits = digits.concat(Array(4 - digits.length).fill(false));
                $rootScope.$broadcast('pincode_input', digits);
            };
            
            $scope.digits = Array(4).fill(false);

            $element.find('input').unbind().bind('keyup', event => {
                var inputKey = event.originalEvent.key;

                if (validInputs.indexOf(inputKey) == -1) {
                    return;
                }

                $timeout(() => {
                    if (inputKey == 'Backspace') {
                        digits.pop();
                        updateAndBroadcast();
                    } else if (inputKey != null && digits.length < 4) {
                        digits.push(inputKey);
                        updateAndBroadcast();
                    }
                }, 0);
            }).focus();
        }]
    };
}];