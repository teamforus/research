# dbh-demo


Build: [![CircleCI](https://circleci.com/gh/community2/forus.svg?style=svg&circle-token=cf9c9053edb949498ed3710fabe9a70654d5e029)](https://circleci.com/gh/community2/forus)

##Install


###  prerequisites:
add google api key to views/layout/includes/scripts.jade and dev/sources/base/pug/layout/includes/scripts.jade

cd into the project folder and then execute:
```
npm install
```

Maybe also run (if not automatically done by ```npm install```):
```
./node_modules/truffle/cli.js compile
cd /dev && npm install && ./node_modules/gulp/bin/gulp.js compile
```

If the Smart Contract was not yet compiled, run
```
./node_modules/truffle/cli.js compile
```

##Run
If testing on local machine, run:
```
// Start testrpc with a certain set of test accounts
testrpc --seed 0 &

// Deploy the smartcontracts to the (testrpc) blockchain
./node_modules/truffle/cli.js migrate
```
and then, for starting the website:
```
npm start
```

## Dependencies
This depends on a ethereum network. At the moment this is running on a private amazon server. It can be changed in ```modules/web3Wrapper.js```.

A simple ethereum network can be set up with testrpc: https://github.com/ethereumjs/testrpc

## Connection to and Communication with the (local) blockchain
In ```modules/web3Wrapper.js```, the connection is made as follows.

Before everything, make sure that you started the Ethereum client with e.g. 
```
testrpc --seed 0 &
``` 
and deployed the Smart Contract to it with 
```
./node_modules/truffle/cli.js migrate
```

Then, in ```modules/web3Wrapper.js```, we create a HTTP provider, which connects to the Ethereum client (e.g. testrpc)
```
let url = URL_TO_CLIENT (e.g. 'http://localhost:8545')
let httpProvider = new Web3.providers.HttpProvider(url);
```

Next, we establish the Web3 protocol and retrieve the contract as a local object with which we then can interact like with any other object.
``` 
let web3 = new Web3(httpProvider);
let contractFactory.setProvider(web3.currentProvider);
let contract = contractFactory.deployed();
```

From now on, you can call the functions, which are specified in the Smart Contract, via the ```contract``` object.
Variables can be retrieved from the contract in the blockchain via e.g. 
```
contract.users.call().then(function(result) {
  console.log('The result is: ' + result);
}).catch(function(error) {
  console.error('An error occurred: ' + error);
});
```
