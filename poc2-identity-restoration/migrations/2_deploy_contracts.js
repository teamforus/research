var Identity = artifacts.require("./IdentityManager.sol");
//var Owned = artifacts.require('./Owned.sol');

module.exports = function(deployer) {
  deployer.deploy(Identity);
  
};
