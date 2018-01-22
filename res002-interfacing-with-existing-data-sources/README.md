# Research: interfacing with existing data sources 

### v0.0

## Background / Context
**Goal/user story:** 

The Forus platform knows two kind of validators. Validators like 'RDW' or 'Kadaster' register digital assets; An identity can own/control a digital asset. A validator like a goverment agency validates records (birth certificate) of an identity. The difference between the two types of data is that the assets are interchangable and the records are not.

There are multiple options to add these types of existing data to the blockchain. In this RES we will look at a few options with pro's and con's

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
#### Con's
- Forus needs to build an offchain B2C API.
- The identity has to add their information themself 

## Method
*documentation/code*

