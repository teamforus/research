var IdentityManager = artifacts.require('./IdentityManager');
var ForusVendor = artifacts.require('./ForusVendor');
var Identity = artifacts.require('./Identity');


module.exports = function(deployer) {
  // ID Manager address: 0xd8b7a30247b9e6e6bfe9590d8c74daf8a6adfb4d
  deployer.deploy(IdentityManager).then(() => { return deployer.deploy(ForusVendor, IdentityManager.address) } );
  //deployer.deploy(ForusVendor, '0xd8b7a30247b9e6e6bfe9590d8c74daf8a6adfb4d');
  //deployer.deploy(Identity, '0xE347d18EAFe9DFDe4d234356B3454c08fA37E6fA');
  
};
