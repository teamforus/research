# Me app: backend specs
_This document serves as a preliminary outline of the requirements and options for creating a me-backend._  

**draft:** v0.1

**current situation:** the functionality in the [me app](https://github.com/teamforus/me) is currenly provided by the [forus backend](https://github.com/teamforus/forus-backend/tree/master). This is the result of a pragmatic approach that offered the quickest way to get the application in the hands of users and start providing value for [Forus](https://github.com/teamforus/forus). The next step is to seperate the me app and forus so that they can be two seperate products. To achieve this me needs its own backend. There are different methods to do this. Research is needed before choosing a solution.

## Abstract:
The me app is designed to be an _identity_ application. 

**Identity:** something unique to be identified. In the me app an identity is represented by a unique keypair.

**Attributes:** Information about an identity, that can be verified by other identities but is not transferable.

**Ownership:** Something that is owned by an identity, but that can be transfered to another identity.

## Functionality
* Identity
  * [Key storage]()
  * [Identification]()
* [Records]() (attributes)
  * Storing
  * Signing
  * Exposing / Proofing
* Wallet (ownership)
  * [Vouchers Forus]()
  * [Crypto assets]()
    * [Valuta]() ([Ether]())
    * [Tokens]() ([ERC20]())
    * [NFT's]() ([ERC721]())


