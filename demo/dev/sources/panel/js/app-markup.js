// custom plugin
$.prototype.listSortable = function(args) {
    var listSortable = function($root) {
        var self = this;
        var template = $root.find('[template]').clone();
        var itemsRoot = $root.find('[list-sortable-root]');
        var addItem = $root.find('[add-option]');
        var addItemInput = addItem.find('[add-option-input]');

        this.bind = function() {
            addItem.find('[add-option-btn]').unbind('click').bind('click', function(e) {
                e && e.preventDefault() & e.stopPropagation();

                var text = addItemInput.val();
                var item = template.clone();

                item.removeClass('hidden');
                item.find('input').val(text);
                addItemInput.val('');

                itemsRoot.append(item);

                self.bindSortable();
            });
        }

        this.bindSortable = function() {
            // https://github.com/RubaXa/Sortable
            Sortable.create(itemsRoot[0], {
                animation: 150,
                handle: ".list-option-item",
                draggable: ".list-option-item",
                onUpdate: function(evt) {
                    var item = evt.item;
                }
            });
        };

        $root.find('[template]').remove();
        this.bind();
    }

    for (var i = this.length - 1; i >= 0; i--) {
        new listSortable($(this[i]));
    }
};

$('[list-sortable]').listSortable();

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var chartColors = {
    "red": "rgb(255, 99, 132)",
    "orange": "rgb(255, 159, 64)",
    "yellow": "rgb(255, 205, 86)",
    "green": "rgb(75, 192, 192)",
    "blue": "rgb(54, 162, 235)",
    "purple": "rgb(153, 102, 255)",
    "grey": "rgb(201, 203, 207)"
};

var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                chartColors.red,
                chartColors.orange,
                chartColors.yellow,
                chartColors.green,
                chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
        ]
    },
    options: {
        responsive: true
    }
};

// http://www.chartjs.org/
if (document.getElementById("myChart")) {
    var myPieChart = new Chart(document.getElementById("myChart").getContext("2d"), config);
}

// https://kimmobrunfeldt.github.io/progressbar.js/
if ($('[progress]')[0]) {
    (new ProgressBar.Circle($('[progress]')[0], {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        duration: 1400,
        easing: 'bounce',
        strokeWidth: 5,
        from: {
            color: '#70c567',
            a: 0
        },
        to: {
            color: '#70c567',
            a: 1
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    })).set(1);
}

// https://github.com/davidshimjs/qrcodejs
if (document.getElementById("auth_qr")) {
    (new QRCode("auth_qr")).makeCode("Random string");
}