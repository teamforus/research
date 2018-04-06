kindpakketApp.service('DeviceIdService', ['$http', '$q', function($http, $q) {
    return new(function() {
        this.getOptions = function(credentails, code) {
            return [{
                id: "474f654c51b6e87214a185fe503ccb6084024a73",
                name: 'Device #1'
            }, {
                id: "570fb66aac5281b4474c869f2bc7853cb0051023",
                name: 'Device #2'
            }, {
                id: "92d9af5ec7465dbfbc049bfc189d376e08ed98f2",
                name: 'Device #3'
            }, {
                id: "cc8d266b8088ffb8f176bc7823cdccfa44bb19df",
                name: 'Device #4'
            }, {
                id: "a318d5ab7a81709cf0b4e38f30aae2fcbe641d23",
                name: 'Device #5'
            }];
        };

        this.setDeviceId = function(device_id) {
            return window.localStorage.setItem('device_id', JSON.stringify(device_id));
        };

        this.getDeviceId = function() {
            if (!window.localStorage.getItem('device_id'))
                this.setDeviceId(this.getOptions()[0]);

            return JSON.parse(window.localStorage.getItem('device_id'));
        };
    });
}]);