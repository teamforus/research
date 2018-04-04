var controller = function($rootScope, $scope, $state, $stateParams, FormBuilderService, VoteService) {
    if (!$stateParams.id) {
        return $state.go('votes');
    }

    var ctrl = this;

    VoteService.read($stateParams.id).then(function(res) {
        ctrl.initForm(res.data);
    }, function(res) {
        console.error(res);
        alert('Something went wrong!');
    });

    ctrl.newOptionValue = "";

    ctrl.initForm = function(vote) {
        ctrl.form = FormBuilderService.build(vote);
    };

    ctrl.onSubmit = function() {
        if (ctrl.form.isLocked()) {
            return;
        }

        ctrl.form.lock();

        VoteService.update(ctrl.form.values.id, ctrl.form.values).then(function() {
            ctrl.form.resetErrors();
            $state.go('votes');
            ctrl.form.unlock();
        }, function(res) {
            ctrl.form.errors = res.data;
            ctrl.form.unlock();
        });
    };

    ctrl.addOption = function(e) {
        e.preventDefault() & e.stopPropagation();

        ctrl.form.values.options.push({
            value: ctrl.newOptionValue
        });

        ctrl.newOptionValue = "";
        ctrl.updateOptionOrders();
    }

    ctrl.destroyOption = function(e, option) {
        e.preventDefault() & e.stopPropagation();

        ctrl.form.values.options.splice(
            ctrl.form.values.options.indexOf(option), 1
        );
    }

    ctrl.updateOptionOrders = function() {
        ctrl.form.values.options = ctrl.form.values.options.map(function(option, index) {
            option.order = index;
            return option;
        });
    };

    ctrl.sortable = {
        sort: true,
        animation: 150,
        handle: ".handle",
        draggable: ".list-option-item",
        group: 'options',
        onUpdate: ctrl.updateOptionOrders
    };
};

module.exports = {
    templateUrl: './assets/templates/pages/vote-edit.html',
    controller: ['$rootScope', '$scope', '$state', '$stateParams', 'FormBuilderService', 'VoteService', controller]
};