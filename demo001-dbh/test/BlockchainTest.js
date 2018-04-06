const web3Wrapper = require('../modules/web3Wrapper');
const blockchainOrm = require('../libs/BlockchainOrm/BlockchainOrm');
const blockchainOrmChain = require('../libs/BlockchainOrm/BlockchainOrmChain');

function BlockchainTest() {
    const newUser = new blockchainOrm({
        class: 'user'
    });

    console.log("Test: Find User by ID");
    console.log(new blockchainOrmChain().find(web3Wrapper.getTestAccount()))
}

module.exports = BlockchainTest;