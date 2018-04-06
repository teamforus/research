$(function() {
    // toggle class (tmp)
    $('[toggle-class]').unbind('click').bind('click', function() {
        $(this).toggleClass($(this).attr('toggle-class'));
        return false;
    });

    // google maps plugin
    $('[google-map]').mapPlugin({
        map_options: {
            draggable: true,
            zoomControl: true,
            scrollwheel: false,
            disableDoubleClickZoom: false
        },
        map_zoom: 13,
        markers: []
    });

    $(".chosen-select").chosen({
        disable_search_threshold: 10
    });
});

$.prototype.demoPopup = function() {
    if (this.length == 0)
        return;

    var demoPopup = function($node) {
        var demoSubmitted = Cookies.get('demoSubmitted') || false;

        var bind = function() {
            console.log($node.find('[popup-submit]'));
            $node.find('[popup-submit]').unbind('click').bind('click', function(e) {
                console.log('sad');
                if (e && (e.preventDefault() & e.stopPropagation()));

                Cookies.set('demoSubmitted', true, { expires: 14, path: '' });
                $('body').removeClass('show-demo-popup');
            });
        };

        var init = function() {
            bind();

            if (demoSubmitted)
                $('body').removeClass('show-demo-popup');
        };
        
        init();
    };

    for (var i = 0; i < this.length; i++) {
        new demoPopup($(this[i]));
    }
};

$(function() {
    $('[demo-popup]').demoPopup();
});