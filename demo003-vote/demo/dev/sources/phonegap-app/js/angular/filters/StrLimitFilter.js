module.exports = function() {
    return function(str, length) {
        var append = '';

        if (typeof str != 'string') {
            return '';
        }

        if (str.length > length) {
            append += '...';
        }

        return str.substring(0, length) + append;
    }
};