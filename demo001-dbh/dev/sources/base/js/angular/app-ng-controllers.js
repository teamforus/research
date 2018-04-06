app.controller('BaseCtrl', ['$scope', 'SearchService', function($scope, SearchService) {
    $scope.selectedCategory = 1;
}]);

app.controller('MakeDonationCtrl', ['$scope', function($scope) {
    var groups = {};

    groups.health = {
        title: 'Health',
        fields: [{
            type: "checkbox",
            label: "Moving disabilities",
            value: false,
            fields: [{
                type: "text",
                label: "Disability level",
                value: "",
            }]
        }, {
            type: "checkbox",
            label: "Dislexia",
            value: false,
        }, {
            type: "checkbox",
            label: "Learning disabilities",
            value: false,
        }, {
            type: "checkbox",
            label: "ADHD",
            value: false,
        }]
    };

    groups.financial = {
        title: 'Financial',
        fields: [{
            type: "checkbox",
            label: "Income",
            value: false,
            fields: [{
                type: "radio",
                label: "Specific value",
                value: [{
                    type: "text",
                    label: false,
                    value: "",
                }],
            }, {
                type: "radio",
                label: "Range",
                value: [{
                    type: "text",
                    label: false,
                    placeholder: 'Minimum',
                    value: "",
                }, {
                    type: "text",
                    label: false,
                    placeholder: 'Maximum',
                    value: "",
                }],
            }, {
                type: "radio",
                label: "Minimum",
                value: [{
                    type: "text",
                    label: false,
                    value: "",
                }],
            }, {
                type: "radio",
                label: "Maximum",
                value: [{
                    type: "text",
                    label: false,
                    value: "",
                }],
            }]
        }, {
            type: "checkbox",
            label: "No tax debts",
            value: false,
        }, {
            type: "checkbox",
            label: "Credit history",
            value: false,
        }]
    };

    groups.studies = {
        title: 'Studies',
        fields: [{
            type: 'dropdown',
            label: 'Type',
            value: 1,
            options: {
                1: 'VMBO',
                2: 'HAVO',
                3: 'VWO',
                4: 'VAVO',
                5: 'MBO',
                6: 'HBO',
                7: 'WO'
            }
        }, {
            type: 'checkbox',
            label: 'Enrollment',
            value: false,
            fields: [{
                type: 'checkbox',
                label: 'School',
                value: false,
                fields: [{
                    type: 'text',
                    label: false,
                    value: ''
                }]
            }, {
                type: 'checkbox',
                label: 'Year of graduation',
                value: false,
                fields: [{
                    type: 'text',
                    label: false,
                    value: ''
                }]
            }]
        }, {
            type: 'checkbox',
            label: 'Average grade',
            value: false,
            fields: [{
                type: 'text',
                label: false,
                value: ''
            }]
        }, {
            type: 'dropdown',
            label: 'Language of study',
            value: 1,
            options: {
                1: 'EN',
                2: 'NL',
                3: 'RU'
            }
        }]
    };

    groups.location = {
        title: 'Location',
        fields: [{
            type: 'checkbox',
            label: 'Living now',
            value: false,
            fields: [{
                type: 'dropdown',
                label: 'Region',
                options: {
                    1: 'First Region',
                    2: 'Second Region',
                    3: 'Third Region'
                }
            }, {
                type: 'dropdown',
                label: 'City',
                options: {
                    1: 'First City',
                    2: 'Second City',
                    3: 'Third City'
                }
            }]
        }, {
            type: 'dropdown',
            label: 'Coming from',
            value: false,
            options: {
                1: 'First Country',
                2: 'Second Country',
                3: 'Third Country'
            },
        }]
    };

    $scope.formData = {
        service_name: "",
        offered_quantity: "",
        offered_sum: "",
        active_group: 'health',
        groups: groups
    };
}]);

app.controller('GrantApplicationsCtrl', ['$scope', function($scope) {
    $scope.search = [];
    $scope.search.query = {};
    $scope.search.type = "all";

    $scope.chooseType = function(e, type) {
        e.preventDefault();
        e.stopPropagation();

        $scope.search.requests.map(function(req) {
            req.shown = false;
        });

        $scope.search.type = type;
    };
}]);