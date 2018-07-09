## poc-recoverable-consensus-network

### Background / Context
**Goal:** Combining POC002 and POC008 into a recoverable identity consensus network.

**Bonus**: Allowing the identity to have a wallet, rather than the account having to pay. This way, multiple accounts can share a wallet, or one person can have multiple wallets in one identity. 

### Hypothesis:


### Assignee: Martijn Doornik

### Method
Two contracts are created: an Identity and an IdentityManager. The first one acts as a container for the 
persons voted and validated values, whereas the second one is for managing and storing these. This way, 
a contract can call the identitymanager to get the address of identity X. This will return the IdentityContract 
for idenitifier X. 

### Result
*present findings*

### Recommendation
*write recomendation*
