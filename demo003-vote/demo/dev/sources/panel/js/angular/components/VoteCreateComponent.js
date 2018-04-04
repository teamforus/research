var controller = function($rootScope, $scope, $state, VoteService, FormBuilderService) {
    var ctrl = this;

    ctrl.newOptionValue = "";

    ctrl.form = FormBuilderService.build({
        options: [],
        title: '',
        description: '',
    });

    ctrl.onSubmit = function() {
        if (ctrl.form.isLocked()) {
            return;
        }

        ctrl.form.lock();

        VoteService.store(ctrl.form.values).then(function() {
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

    ctrl.updateOptionOrders = function(options) {
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
    templateUrl: './assets/templates/pages/vote-create.html',
    controller: ['$rootScope', '$scope', '$state', 'VoteService', 'FormBuilderService', controller]
};