let web3Wrapper = require('../../modules/web3Wrapper');
let BlockchainStructUser = require('./BlockchainStruct/BlockchainStructUser');
let BlockchainStructSponsorship = require('./BlockchainStruct/BlockchainStructSponsorship');

// db row wrapper
function BlockchainOrmEntry(_data) {
    this.init(_data);
}

// get json
BlockchainOrmEntry.prototype.toJson = function() {
    return JSON.stringify(this.unwrap());
};

// update fields
BlockchainOrmEntry.prototype.update = function(_key, _value) {
    // apply where condition recursively
    if (typeof _key == "object") {
        for (let key in _key) {
            if (_key.hasOwnProperty(key)) {
                this.update(key, _key[key]);
            }
        }

        return this;
    }

    // add rule
    this.data[_key] = _value;

    // return chain
    return this;
};

// delete data
BlockchainOrmEntry.prototype.delete = function() {
    this.data.deleted = true;
};

// get raw data
BlockchainOrmEntry.prototype.unwrap = function() {
    return this.data;
};

// initialization
BlockchainOrmEntry.prototype.init = function(_data) {
    this.data = _data;
    this.data.deleted = false;

    switch (this.data['class']) {
        case 'user':
            this.struct = new BlockchainStructUser(this);
            break;
        case 'sponsorship':
            this.struct = new BlockchainStructSponsorship(this);
            break;
        case 'grant':
            // TODO
            // Create function for Grant not implemented yet.
            return false;
        case 'validationRequest':
            // TODO
            // Create function for ValidationRequest not implemented yet.
            return false;
    }

    for (let key in this.data) {
        if (this.data.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                get: function() {
                    return this.data[key];
                }
            });
        }
    }

    let res = this.struct.ethCreate().then(function () {
        console.log('BCObject created! Result: ' + res);
    }, function (e) {
        console.error(e);
    })

};

module.exports = BlockchainOrmEntry;