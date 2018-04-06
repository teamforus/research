var fs = require('fs');
var path = require('path');
var web3 = require('../modules/web3Wrapper');
var web3Helper = require('../modules/web3Helper');
var wallet = require('../modules/walletComponent');
var bhAddresses = require('../modules/blockchainAddresses');

var testAccount = '0xf6b39ce8221a48a0ceca0b4d375682c622e1829b';

var library = function() {
    var contractFactory = require("../build/contracts/Forus.sol.js").setProvider(web3.currentProvider);
    var contract = contractFactory.deployed();


};

module.exports = library;

