$.prototype.simpleAnim = function(args) {
    if (this.length === 0)
        return;

    var coll = [];

    var simpleAnim = function($node) {
        var items = $node.find('.' + args.itemClass).unwrap();
        var _items = [];

        var count_total = items.length;
        var count_positive = 0;

        items.each(function(key, item) {
            _items.push(item);
        });

        items = _items.reverse();

        var animateIt = function() {
            if (items.length === 0) {
                if (count_positive == count_total)
                    $(args.unhideOnDoneTarget).removeClass('hidden');
                return;
            }

            var cur_item = $(items.pop());

            if (cur_item.data('state') == '1') {
                cur_item.addClass(args.itemClass + args.passClass);
                count_positive++;
            } else if (cur_item.data('state') == '0') {
                cur_item.addClass(args.itemClass + args.okFail);
                count_positive++;
            } else {
                cur_item.addClass(args.itemClass + args.failClass);
            }

            setTimeout(function() {
                animateIt();
            }, 1000);
        };


        animateIt();
    };

    for (var i = this.length - 1; i >= 0; i--) {
        coll.push(new simpleAnim($(this[i])));
    }
};

$(function() {
    $('[simple-anim]').simpleAnim({
        passClass: '-pass',
        failClass: '-fail',
        okFail: '-ok',
        itemClass: 'apply-verification-item',
        unhideOnDoneTarget: '.unhide-on-done'
    });
});