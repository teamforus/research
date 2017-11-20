## poc_update_smart_contracts

### Background / Context
**Goal/user story:**
As long as platform Forus is in development, it will come in handy to be able to update deployed smart contracts without the necessity to communicate new contract addresses to users/developers. The goal of this poc is to create a (set of) smart contract(s) that serve as a gateway to a smart contract with the actual functionality. 
**More info:**
The technical term for this procedure is dubbed *proxy contracts*

### Hypothesis:
If users interface with a gateway contract, functionality can be upgraded by deploying a new functionality contract, and changing the to_address in the gateway contract.

### Assignee:
Jakko de Jong

### Method
I will follow the method as described in the Colony whitepaper version 20170920, commit 0446a15e5def7378923fe0eee3ce269a4e8cd224, section 2.1: 
https://github.com/JoinColony/Colony-Whitepaper/blob/master/network/network.tex

Another interesting method is described here:
https://www.reddit.com/r/ethereum/comments/4kt1zp/mad_blockchain_science_a_100_upgradeable_contract/

### Result
*pending*

### Recommendation
*pending*
