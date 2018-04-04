var controller = function($rootScope, $scope, $state, $stateParams, VoteService) {
    var $ctrl = this;

    var chartColors = {
        "0": "rgb(255, 99, 132)",
        "1": "rgb(255, 159, 64)",
        "2": "rgb(255, 205, 86)",
        "3": "rgb(75, 192, 192)",
        "4": "rgb(54, 162, 235)",
        "5": "rgb(153, 102, 255)",
        "6": "rgb(201, 203, 207)"
    };

    if (!$stateParams.id) {
        return $state.go('votes');
    }

    VoteService.read($stateParams.id).then(function(res) {
        $ctrl.initChart(res.data);
    }, function(res) {
        console.error(res);
        alert('Something went wrong!');
    });

    $ctrl.initChart = function(vote) {
        var data = vote.options.map(function(option) {
            return option.responses;
        });
        
        var labels = vote.options.map(function(option) {
            return option.value;
        });

        var sum = data.reduce(function(total, value) {
            return total + value;
        });

        $ctrl.vote = vote;
        $ctrl.countResponses = sum;

        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: Object.values(chartColors).splice(0, data.length),
                    label: 'Dataset 1'
                }],
                labels: labels
            },
            options: {
                responsive: true
            }
        };

        // http://www.chartjs.org/
        if (document.getElementById("myChart")) {
            var myPieChart = new Chart(document.getElementById("myChart").getContext("2d"), config);
        }
    };
};

module.exports = {
    templateUrl: './assets/templates/pages/vote-view.html',
    controller: ['$rootScope', '$scope', '$state', '$stateParams', 'VoteService', controller]
};