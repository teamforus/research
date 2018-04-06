app.filter('typeof', function() {
    return function(_in, args) {
        return typeof _in;
    };
});

app.filter('length', function() {
    return function(_in, args) {
        return _in.length;
    };
});