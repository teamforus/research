## Under consideration

### POC: Use encryption to sign data and check signature on:  
  - iOS
  - Android
  - Browser

### POC: Generate a keypair on android   
  
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

# Proposals

  - Wat is er nodig om het platform GDPR-compliant by design te maken? #privacy-by-design
    - i.e.: zodanig inrichten dat aan front-end kant zo min mogelijk privacykeuzes gemaakt hoeven worden. #privacy-by-design

  - Welke platformen voldoen aan welke vereisten?
    "grid met platformen en hoe het voldoet aan vereisten + tijdlijn/roadmap
    
- Wanneer kunnen we door naar de volgende fase?

- Open source governance
"https://opensource.guide"
- Bestuur bestaande projecten
  - Rocket.Chat
  - Brave
  - Swift
- Kan een client een node zijn? (light client)
