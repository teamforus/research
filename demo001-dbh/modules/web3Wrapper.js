const Web3 = require('web3');
const contractFactory = require("../build/contracts/Forus.sol");

const web3Wrapper = (function() {
    const url = "http://localhost:8545";
    const testAccount = '0xf6b39ce8221a48a0ceca0b4d375682c622e1829b';
    let web3 = null;
    let contract = null;

    function init() {
        let httpProvider = new Web3.providers.HttpProvider(url);
        web3 = new Web3(httpProvider);
        contractFactory.setProvider(web3.currentProvider);
    }

    init();

    function getContract() {
        if (contract == null) {
            contract = contractFactory.deployed();
        }
        return contract;
    }

    function getTestAccount() {
        return testAccount;
    }

    return {
        getContract: getContract,
        getTestAccount: getTestAccount
    }
})();

module.exports = web3Wrapper;