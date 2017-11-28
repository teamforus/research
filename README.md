## poc_ethereum_contracts_platform_roles

### Background / Context
**Goal/user story:** To enable the interactions between sponsor/validator/requester/provider in ethereum smart contracts.

**More:**
The script yields the use of specific tokens. Tokens are used to pay with, and only certain things (artifacts) can be bought with 
certain tokens. Restrict the purchase of certain artifacts.
### Hypothesis:
Although complex and thus expensive, this should be more than doable. 
### Method
A poc is created implemented these four roles. The requester/applicant is able to spend token that a sponsor has created. 
This can be any address as of now, and in the future could be restricted to only a certain type of contract.
### Result
The code works and the script allows the four roles to do their thing. Consider the current version as a 0.9 version, being 
close to deployable/production, but should still be refined. Some access modifiers have been changed to public to allow better
debugging. Also note that artifact validation is not yet enabled.
### Recommendation
The script can interact in multiple ways. When requesting certain data, you can use the public 'view' methods. When handling a 
transaction involving one of the four roles (for example, validating a requester), when successful, an event will trigger. 
When making (frontend)-applications for this script, remember to handle these events.
Perhaps it is also welcome to trigger an event when an action is unsuccessful. Remember though, that every client listening to 
event will get ALL events, not just events bound to the user.