## Workflow (work in progress)
1: A suggestion can be made in an issue.  
2: With enough interest it is put under consideration.  
3: If we decide to make the poc, the proposal gets a number and is moved to it's own folder where the [workflow template](https://github.com/teamforus/proofs-of-concept/blob/master/workflow_template.md) is filled in.  
4: The poc gets build, results get shared in the folder and get reviewed.  
5: The poc is added to completed pocs.


## Completed 


## In progress

### POC1: [Generate a keypair on android](https://github.com/teamforus/proofs-of-concept/tree/master/android_keypair) 


## Under consideration

### POC: Use encryption to sign data and check signature on:  
  - iOS
  - Android
  - Browser

### POC: Authenticate on node with keypair in app > perform transactions without sending private key to server.
 
### POC: (light)Client in app. Perform transactions locally.

### POC: Interaction between smart contract and IPFS.

### POC: Interaction between smart contract and Swarm.

### POC: Interaction between smart contract and local data on client-side.

### POC: End-to-end encryption and decryption on:
  - iOS
  - Android
  - Browser

### POC: Temporary access to data on IPFS/Swarm.
  - smart contract that manages who has access to what.
  - Temporary keys, can keys be made unusable?

### POC: Updates of smart contracts
  - proxy contracts

### POC: Validation functionality
  - Data entirely in ethereum smart contract
  - Data in Swarm/IPFS, signatures and validation process in smart contract
  - Data and signatures in Swarm/IPFD, validation process in smart contract

### POC: Validation functionality, end to end / off chain

### POC: Validation functionality met zero knowledge
  - ZKSnarks
  - What kind of data can be validated?

### POC: Restoration of access to identity
  - proxy contract
  - check uPort functionality

### POC: Up-to-date access management
  - How to deal with people that for example leave a company?

### POC: Key management with derived keys
  - Top issuer knows *lower* keys
  - *Lower* keys do **not** know *higher* keys

### POC: Costs & Benefits
  - Transactions/Computing
  - Storage/Memory
  - Network/Server
  - Who pays for what in centralized and decentralized scenario?

### POC: API design
 
### POC: Contract migratie
  - Mogelijkheden vergelijken Truffle, Embark, .... #smart-contracts
  - welke voor- en nadelen hebben deze? #smart-contracts

### POC: Host frontend on IPFS
  - how to update decentralised front-end?

### POC: Host frontend on Swarm
  - how to update decentralised front-end?

### POC: IPNS (nameserver IPFS)
  - Is it possible to change IPFS data without having to change the linkhash in smart contract?

### POC: Pay transaction fees for other contract

### POC: Blockchain platform comparison
  - Contenders
    - Ethereum
    - Bitcoin

  - Requirements
    - Open source community
    - Permissionless consensus algorithm
    - Scalability
    - Smart Contracts & *Turing completeness*
    - Low costs

### POC: Ethereum scalability
  - transaction speed

### POC: Structure of decentralize data.
  - Use part of same IPFS data in multiple dapps

### POC: state/payment channels
  - Perform safe transactions off-chain, backed by a transaction on-chain. 

### POC: Generic usable identities
  - One identity for multiple different dapps
  - Uport

### POC: Incentivize validators
  - Validator inception: validation of validators

### POC: Zero knowledge proofing (zk-snarks)
- What kind of data can be proofed with ZK-snarks?
  - booleans
  - numbers
  - signatures
