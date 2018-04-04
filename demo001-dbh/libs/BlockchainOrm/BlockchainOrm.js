const BlockchainOrmChain = require('./BlockchainOrmChain');

function BlockchainOrm(orm_args) {
    this.init(orm_args);
}

// search in id
BlockchainOrm.prototype.find = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.find.apply(orm_chain, arguments);
};

// apply search condition
BlockchainOrm.prototype.where = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.where.apply(orm_chain, arguments);
};

// get first element from db
BlockchainOrm.prototype.first = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.first.apply(orm_chain, arguments);
};

// delete rows
BlockchainOrm.prototype.delete = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.delete.apply(orm_chain, arguments);
};

// update rows
BlockchainOrm.prototype.update = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.update.apply(orm_chain, arguments);
};

// crate row
BlockchainOrm.prototype.create = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.create.apply(orm_chain, arguments);
};

// get first element from db
BlockchainOrm.prototype.get = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.get.apply(orm_chain, arguments);
};

// down warp raws in BlockchainOrmEntry
BlockchainOrm.prototype.dontWrap = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.dontWrap.apply(orm_chain, arguments);
};

// take only nth count rows
BlockchainOrm.prototype.take = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.take.apply(orm_chain, arguments);
};

// skip first nth rows
BlockchainOrm.prototype.skip = function() {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.skip.apply(orm_chain, arguments);
};

BlockchainOrm.prototype.init = function(_data) {
    let orm_chain = new BlockchainOrmChain();

    return orm_chain.create(_data);
};

module.exports = BlockchainOrm;