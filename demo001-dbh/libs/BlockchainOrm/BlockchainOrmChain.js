const BlockchainOrmEntry = require('./BlockchainOrmEntry');
var web3Wrapper = require('../../modules/web3Wrapper');

// 
function FakeBlockchainDB() {
    let data = [{
        id: 1,
        first_name: "Valentin",
        last_name: "Branetchi",
        age: 24,
        location: "Netherlands",
        job: "Coder"
    }, {
        id: 2,
        first_name: "John",
        last_name: "Doe",
        age: 34,
        location: "Netherlands",
        job: "Loser"
    }, {
        id: 3,
        first_name: "Dan",
        last_name: "Ghimpu",
        age: 24,
        location: "Netherlands",
        job: "CEO"
    }, {
        id: 4,
        first_name: "Alexandru",
        last_name: "Mocreac",
        age: 28,
        location: "Moldova",
        job: "Designer"
    }];

    return data;
}

let fake_db = FakeBlockchainDB();


function BlockchainOrmChain() {
    // object itself
    this._self = this;

    // search conditions
    this._wheres = [];

    // count returned rows
    this._take = false;

    // skiped rows from start
    this._skip = 0;

    // do we need wrap rows
    this._wrap_rows = true;

    this.init();
}

// apply filter and get matches
BlockchainOrmChain.prototype.apply_limits = function(_data, _wrap_data) {
    let _self = this;

    // apply filters
    if (_self._wheres.length > 0) {
        _data = _data.filter(function(entry, entry_key) {
            for (let i = 0; i < _self._wheres.length; i++) {
                let sign = _self._wheres[i][2];
                let pass = sign == '!=';

                for (let _entry in entry) {
                    if (entry.hasOwnProperty(_entry)) {
                        if (sign == '=') {
                            if (_entry == _self._wheres[i][0] && entry[_entry] == _self._wheres[i][1])
                                return true;
                        } else if (sign == '!=') {
                            if (_entry == _self._wheres[i][0] && (entry[_entry] == _self._wheres[i][1]))
                                return false;
                        }
                    }
                }

                return pass;
            }

            return false;
        });
    }

    // console.log('TEST', [_self._skip, _self._skip + (_self._take || _data.length)]);
    // apply count limitations 
    _data = _data.slice.apply(_data, [_self._skip, _self._skip + (_self._take || _data.length)]);

    // convert raw data to OrmEntry
    if (_wrap_data) {
        _data = _data.map(function(entry) {
            return new BlockchainOrmEntry(entry);
        });
    }

    return _data;
};

// get first match
BlockchainOrmChain.prototype.first = function() {
    // skip 0 and take 1
    this._take = 1;

    return this.apply_limits(fake_db, this._wrap_rows)[0] || false;
};

// get all matches
BlockchainOrmChain.prototype.get = function() {
    let _self = this;

    // skip 0 and take 1
    return this.apply_limits(fake_db, _self._wrap_rows);
};

// delete rows
BlockchainOrmChain.prototype.delete = function() {
    let count = 0;

    this.apply_limits(fake_db, false).forEach(function(row) {
        if (fake_db.indexOf(row) != -1) {
            fake_db.splice(fake_db.indexOf(row), 1);
            count++;
        }
    });

    return count;
};

// update rows
BlockchainOrmChain.prototype.update = function(data) {
    let count = 0;

    this.apply_limits(fake_db, false).forEach(function(row) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                row[key] = data[key];
            }
        }
        count++;
    });

    return count;
};

// create new record
BlockchainOrmChain.prototype.create = function(new_struct) {
    let _self = this;

    // apply where condition recursively
    if (Array.isArray(new_struct)) {
        let created = [];

        new_struct.forEach(function(row) {
            created.push(_self.create(row));
        });

        return created;
    }

    return new BlockchainOrmEntry(new_struct);

};

// add where conditions
BlockchainOrmChain.prototype.where = function(_key, _value, _sign) {
    let _self = this;

    // apply where condition recursively
    if (typeof _key == "object") {
        for (let key in _key) {
            if (_key.hasOwnProperty(key)) {
                _self.where(key, _key[key]);
            }
        }

        return this;
    }

    // add rule
    this._wheres.push([_key, _value, _sign || '=']);

    // return chain
    return this;
};

// down warp raws in BlockchainOrmEntry
BlockchainOrmChain.prototype.dontWrap = function() {
    this._wrap_rows = false;

    return this;
};

// find row by id
BlockchainOrmChain.prototype.find = function(id) {
    // this.contract.findUser.call({id: id}).then(function (res) {
    //     return res;
    // }).catch(function (err) {
    //     console.error("Retrieved Usersr, but got an error: " + err);
    // });
};

// take only nth count rows
BlockchainOrmChain.prototype.take = function(nth) {
    this._take = nth;
    return this;
};

// skip first nth rows
BlockchainOrmChain.prototype.skip = function(nth) {
    this._skip = nth;
    return this;
};

// initialization
BlockchainOrmChain.prototype.init = function() {
    this.contract = web3Wrapper.getContract();
};

module.exports = BlockchainOrmChain;