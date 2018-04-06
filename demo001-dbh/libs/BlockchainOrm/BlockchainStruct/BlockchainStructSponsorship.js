let web3Wrapper = require('../../../modules/web3Wrapper');

function BlockchainStructSponsorship(entry) {
    this.entry = entry;
}

BlockchainStructSponsorship.prototype.ethCreate = function () {
    return web3Wrapper.getContract().newSponsorship({
        from: web3Wrapper.getTestAccount(),
        name: this.entry.data['name'],
        quantity: this.entry.data['quantity'],
        sum: this.entry.data['sum']
    })
};

module.exports = BlockchainStructSponsorship;