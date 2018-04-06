var controller = function($rootScope, $scope, $state, $stateParams, CredentialsService, VoteService) {
    var ctrl = this;

    VoteService.active().then(function(res) {
        ctrl.vote = res.data;
    }, function(res) {
        $rootScope.modals.push({
            icon: [res.data.type == 'danger' ? 'mdi-close-circle-outline' : 'alert-circle-outline'],
            title: res.data.title,
            desc: res.data.desc,
            type: res.data.type,
            confirm: function() {
                $state.go('logout');
            }
        });
    });

    ctrl.submitVote = function(option_id) {
        if (!option_id) {
            return;
        }

        VoteService.vote(ctrl.vote.id, option_id).then(function(res) {
            $rootScope.modals.push({
                icon: ['mdi-checkbox-multiple-marked-circle-outline'],
                title: "Success!",
                desc: 'You have successfully voted.',
                type: 'success',
                confirm: function() {
                    $state.go('logout');
                }
            });
        }, function(res) {
            $rootScope.modals.push({
                icon: [res.data.type == 'danger' ? 'mdi-close-circle-outline' : 'alert-circle-outline'],
                title: res.data.title,
                desc: res.data.desc,
                type: res.data.type,
                confirm: function() {
                    $state.go('logout');
                }
            });
        });
    };
};

module.exports = {
    templateUrl: './assets/templates/pages/vote.html',
    controller: ['$rootScope', '$scope', '$state', '$stateParams', 'CredentialsService', 'VoteService', controller]
};