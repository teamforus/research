var controller = function($rootScope, $scope, $state, $filter, VoteService) {
    var ctrl = this;

    ctrl.loadList = function() {
        VoteService.list().then(function(res) {
            ctrl.votes = res.data.map(function(vote) {
                vote.description = $filter('strLimit')(vote.description, 64);
                vote.title = $filter('strLimit')(vote.title, 16);
                
                return vote;
            });
        });
    };

    ctrl.voteActivate = function(vote) {
        VoteService.activate(vote.id).then(function(res) {
            ctrl.loadList();
        }, function(res) {
        console.error(res);
            alert('Something went wrong!');
        });
    };

    ctrl.voteDestroy = function(vote) {
        VoteService.destroy(vote.id).then(function(res) {
            ctrl.loadList();
        }, function(res) {
            alert('Something went wrong!');
        });
    };

    ctrl.loadList();
};

module.exports = {
    templateUrl: './assets/templates/pages/vote-list.html',
    controller: ['$rootScope', '$scope', '$state', '$filter', 'VoteService', controller]
};