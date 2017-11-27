# poc 3 - Contract Migration
### v1.0

## Background / Context
As a developer I want to use to a framework to manage the migration of the smartcontacts to the blockchain so that I can focus on developing great application.

# Truffle
Truffle is a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. With Truffle, you get:

* Built-in smart contract compilation, linking, deployment and binary management.
* Automated contract testing with Mocha and Chai.
* Configurable build pipeline with support for custom build processes.
* Scriptable deployment & migrations framework.
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication.
* Instant rebuilding of assets during development.
* External script runner that executes scripts within a Truffle environment.

# Embark
Embark is a framework that allows you to easily develop and deploy Decentralized Applications (DApps).

A Decentralized Application is a serverless html5 application that uses one or more decentralized technologies.

Embark currently integrates with EVM blockchains (Ethereum), Decentralized Storages (IPFS), and Decentralized communication platforms (Whisper and Orbit). Swarm is supported for deployment.

With Embark you can:

**Blockchain (Ethereum)**
* Automatically deploy contracts and make them available in your JS code. Embark watches for changes, and if you update a contract, Embark will automatically redeploy the contracts (if needed) and the dapp.
* Contracts are available in JS with Promises.
* Do Test Driven Development with Contracts using Javascript.
* Keep track of deployed contracts; deploy only when truly needed.
* Manage different chains (e.g testnet, private net, livenet)
* Easily manage complex systems of interdependent contracts.

**Decentralized Storage (IPFS)**
* Easily Store & Retrieve Data on the DApp through EmbarkJS. Including uploading and retrieving files.
* Deploy the full application to IPFS or Swarm.


**Decentralized Communication (Whisper, Orbit)**
* Easily send/receive messages through channels in P2P through Whisper or Orbit.

**Web Technologies**
* Integrate with any web technology including React, Foundation, etc..
* Use any build pipeline or tool you wish, including grunt, gulp and webpack.


## Method

*Truffle*
1. $ npm install -g truffle ethereumjs-testrpc      // Install global dependencies.
2. $ mkdir myproject                                // Create project folder.
3. $ cd myproject                                   // Navigate into the project.
4. $ truffle unbox webpack                          // Let Truffle unbox a webpack template.
5. $ truffle compile                                // Let Truffle compile our contracts.
6. $ testrpc                                        // Start a local testrpc.
7. $ truffle migrate                                // Let Truffle migrate the contracts to our testrpc.
8. $ npm run dev                                    // Use Lite-server to serve our front-end.

*Embark*
1. $ npm -g install embark ethereumjs-testrpc       // Install global dependencies.
2. $ embark demo                                    // Use Embark to generate a demo project.
3. $ cd embark_demo                                 // Navigate into the project.
4. $ embark blockchain *OR* $ embark simulator      // Use a testnet node or use a local testrpc.
5. $ embark run                                     // Let Embark run to compile and migrate.

## Result
|   				    |  Truffle 	            |  Embark 	            |
|:-:				    |---		            |---		            |
|Created At			    |2015-06-29T19:46:53Z   |2015-05-24T13:10:10Z   |
|Number of commits	    |677                    |1180                   |
|Contributers 		    |35                     |30                     |
|Downloads(Monthly)	    |30.000                 |10.000                 |
|Compilation            |Yes                    |Yes                    |
|Migration              |Yes                    |Yes                    |
|1-Click IPFS deploy    |No                     |Yes                    |
|1-Click Swarm deploy   |No                     |Yes                    |


## Recommendation
*write recomendation*

## Side-note
There used to be 2 demo projects including in this poc. However it's easier to just create a demo project from the console. Therefor I have removed the 2 demo projects.

