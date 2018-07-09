var IdentityManager = artifacts.require('./IdentityManager');
var ForusVendor = artifacts.require('./ForusVendor');


module.exports = function(deployer) {
  // ID Manager address: 0xd8b7a30247b9e6e6bfe9590d8c74daf8a6adfb4d
  deployer.deploy(IdentityManager).then(() => { return deployer.deploy(ForusVendor, IdentityManager.address) } );
  //deployer.deploy(ForusVendor, '0xf5508b8122134432db0eb4c7358d35a68eaa4588');
};
