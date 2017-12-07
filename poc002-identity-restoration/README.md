## poc002-identity-restoration

### Background / Context
**Goal:** Allow users who lost their keys to recover their accounts by allowing certain accounts to set his address.

### Hypothesis:
Using an identity manager, someone should be able to recover his lost wallet. 

### Assignee: Martijn Doornik

### Method
When someone is made a validator of an identity, the validator can then set the address of the identity to a 
different address. Identities will be identified by `uint` variables, rather than addresses. 

### Result
The contracts provided allow the given goal. 

### Recommendation
In future versions, it would be good to have a contract which is deployed per new user. This way, you wouldn't 
get an `uint` as identity identifier, but instead gain the identity contract object itself. 
