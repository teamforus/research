(function($) {
    $.prototype.slowScroll = function() {
        if (this.length == 0) return;

        var slowScroll = function($root) {
            var target = $root.attr('href');

            $root.unbind('click').bind('click', function() {
                var offset = {
                    y: parseInt($root.attr('offset-y') || 0)
                };

                $('html, body').animate({
                    scrollTop: Math.max(0, $(target).offset().top + offset.y)
                }, 800);

                setTimeout(function() {
                    $(target).blink({
                        blink_freq: 400,
                        duration: 3000
                    });
                }, 800);
            });
        };

        for (var i = 0; i < this.length; i++) {
            new slowScroll($(this[i]));
        }
    };

    $.prototype.blink = function(options) {
        if (this.length == 0) return;

        var blink = function($root, options) {
            var interval = setInterval(function() {
                options.duration -= options.blink_freq;

                if (options.duration <= 0) {
                    $root.css('opacity', 1);
                    return clearInterval(interval);
                }

                if ($root.css('opacity') == 0) {
                    $root.css('opacity', 1);
                } else {
                    $root.css('opacity', 0);
                }
            }, options.blink_freq);
        };

        for (var i = 0; i < this.length; i++) {
            new blink($(this[i]), JSON.parse(JSON.stringify(options)));
        }
    };

    $.prototype.tabulation = function() {
        if (this.length == 0) return;

        var tabulation = function($root) {
            var $tabs = $root.find('[tabulation-tab]');
            var $panes = $root.find('[tabulation-pane]');

            $tabs.unbind('click').bind('click', function(e) {
                e.preventDefault() && e.stopPropagation();

                var wasActive = $(this).hasClass('active');

                $panes.removeClass('active');
                $tabs.removeClass('active');

                var activeIndex = $(this).attr('tabulation-tab');

                if (!wasActive) {
                    $root.find(
                        '[tabulation-pane="' + activeIndex + '"]').addClass('active');
                    $(this).addClass('active');
                }

            });

            $tabs[0].click();
        };

        for (var i = 0; i < this.length; i++) {
            new tabulation($(this[i]));
        }
    };
})(jQuery);

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
})).set(.71);

(new ProgressBar.Circle($('[progress]')[1], {
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