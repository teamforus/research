var Identity = artifacts.require("./IdentityManager.sol");

module.exports = function(deployer) {
  deployer.deploy(Identity);
};
