let web3Wrapper = require('../../../modules/web3Wrapper');

function BlockchainStructUser(entry) {
    this.entry = entry;
}

BlockchainStructUser.prototype.ethCreate = function () {
    return web3Wrapper.getContract().createUser({from: web3Wrapper.getTestAccount()});
};

module.exports = BlockchainStructUser;