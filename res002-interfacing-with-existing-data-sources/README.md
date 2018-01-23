# Research: interfacing with existing data sources 

### v0.0

##### List of terms

JSON-LD Object - JSON stands for JavaScript Object Notation object for Linked Data
JSON-LD is a World Wide Web Consortium (W3C) Recommendation. It is an open format to provide context and structure to data.
https://en.wikipedia.org/wiki/JSON-LD 

IPFS - IPFS stands for InterPlanetary File-System
IPFS is a protocol designed to create content-adressable, peer-to-peer method of storing and sharing files in a distributed file system. 
Notable IPFS users: The Catalan independence referendum, taking place in September-October 2017, was deemed illegal by the Constitutional Court of Spain and many related websites were blocked. Subsequently, the Catalan Pirate Party mirrored the website on IPFS to bypass the High Court of Justice of Catalonia order of blocking.
https://en.wikipedia.org/wiki/InterPlanetary_File_System


## Background / Context
**Goal/user story:** 

The Forus platform knows two kinds of validators. Validators like 'RDW' or 'Kadaster' register digital assets; An identity can own/control a digital asset. A validator like a goverment agency validates records (birth certificate) of an identity. The difference between the two types of data is that the assets are interchangable and the records are not.

There are multiple options to add these types of existing data to the blockchain. In this research we will look at a few options with pro's and con's

## Hypothesis:

### Validator adds the data
An identity request his or her data. A validator pushes the requested data to the blockchain using an API from Forus

#### Pro's
- Not labor intensive for the validator. The request can be handled automaticaly 
#### Con's
- Forus needs to build an API that automatically pushes data that is requested.

### Identity (end-user) adds the data
An identity request his or her data. A validator sends the data off-chain to the identity. The identity adds the information to the blockchain.

#### Pro's
- The identity adds the data to the blockchain and no validator is liable for the leakage of these records.
- Existing data communication channels can be used to transfer data from the validator to the requesting identity
#### Con's
- The identity has to add their information themself,

## Method

### data registered and stored on the blockchain
#### PRO's
- Data can directly be used in Smart contracts
#### CON'S
- Storing data on the blockchain is expensive.
- Data is hidden in plain sight. (not encrypted but not easily accessible)


##### Validator adds the data to the blockchain
##### Identity adds the data to the blockchain

### data stored on IPFS, registry on blockchain
#### PRO's
- Validation
#### CON'S
- Proofs need to be generated with Zero knowledge. Data can't be used on chain.
- The proofer needs an IPFS node to import the data.

##### Validator adds the data to IPFS, registers datalocation on blockchain

Steps:
- An identity files an 'insight' request to the validator.
- Validator makes a JSON-LD object, thats formatted so that it can be used by the Forus Platform
- Validator digitaly signs this JSON object using his private key.
- Validator responds with a signed JSON object. 
- The validator will encrypt this object using their own private key.
- The validator will upload this JSON-LD object to IPFS
- The validator registers the claim on the Ethereum blockchain by submitting the IPFS hash (location), issuer (validator public key)

##### Identity adds the data to IPFS, registers datalocation on blockchain
Steps:
- An identity files an 'insight' request to the validator.
- Validator makes a JSON-LD object, thats formatted so that it can be used by the Forus Platform
- Validator digitaly signs this JSON object using his private key.
- Validator responds with a signed JSON object. 
- Identity uploads this JSON-LD object to IPFS
- The identity registers the claim on the Ethereum blockchain by submitting the IPFS hash (location), issuer(identity's public key)