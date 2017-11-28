//var SalvToken = artifacts.require('./ChildBudgetToken.sol');
var SalvController = artifacts.require("./Salv.sol");
//var Test = artifacts.require('./Test.sol');
//var TestDependency = artifacts.require('./Test.sol');

module.exports = function(deployer) {
  deployer.deploy(SalvController);
  //deployer.deploy(SalvToken);
  //deployer.deploy(TestDependency);
  //deployer.deploy(Test);
};
