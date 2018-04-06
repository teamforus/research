module.exports = ['$http', function($http) {
    return new(function() {
        this.build = function(values, errors) {
            return {
                locked: false,
                values: values || {},
                errors: errors || {},
                lock: function() {
                    this.locked = true;
                },
                unlock: function() {
                    this.locked = false;
                },
                isLocked: function() {
                    return this.locked;
                },
                resetValues: function() {
                    return this.values = {};
                },
                resetErrors: function() {
                    return this.errors = {};
                },
                reset: function() {
                    return this.resetValues() & this.resetErrors();
                },
            };
        };
    });
}];