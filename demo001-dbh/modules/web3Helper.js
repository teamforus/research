var _web3 = require('./web3Wrapper');
var solc = require('solc');

var helper = (function() {
    var public = {};

    public.getContract = function(interface, address) {
        var contractFactory = _web3.eth.contract(interface);
        return contractFactory.at(address);
    };

    public.compile = function(source, contractNameOpt) {
        var contractName = ':' + contractNameOpt;
        var useOptimizer = 1;

        var compiled = solc.compile(source, useOptimizer);
        // if (contractName in compiled.contracts) {
            var contract = compiled.contracts[contractName];
            var _bytecode = '0x' + contract.bytecode;
            var abi = contract.interface;
            return {
                bytecode: _bytecode,
                interface: JSON.parse(abi)
            };
        // }

        return -1;
    };

    public.estimateGasPrice = function(contract_bytecode) {
        var gasPrice = _web3.eth.estimateGas({data: contract_bytecode}) + 100000;
        if (gasPrice > 3000000) {
            console.log('Gas Price exceeded: ' + gasPrice);
            gasPrice = 3000000;
        }

        return gasPrice;
    };

    return public;
})();

module.exports = helper;