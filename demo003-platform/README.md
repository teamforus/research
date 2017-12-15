# Demo December 18th 2017
### v0.2

### Assignee: Martijn Doornik

## Goal
The goal of the demo is to show the way the decentralized platform would operate, showing 
new people the way blockchain development goes. 

## Execution

This demo is an Ethereum blockchain demo. You can run it on a Geth network or a TestRPC 
network (see Wiki)

Only two contracts have to be deployed and in the following order: IdentityManager and 
ForusVendor. 

Users use the platform via the Identity (_i_) contract and will be assigned to four 
roles: Validators _v_, Requesters _r_, Sponsors _s_ and Providers _p_ but are not 
restricted to only one. 

### Step 0: requirements

- Every _i_ should add the ForusVendor script to their trusted application (addPermission).

### Step 1: validating a user

- _v_ can validate _i_ via the "vote" contract method. 

### Step 2: sponsoring a token

- Any _i_ can become _p_ by creating a token _t_ to the network. This is done by adding 
_t_ via the ForusVendor "addToken" method, triggering event "TokenAdded". 

### Step 3: providing an artifact

- _s_ can select any _i_ to be _p_ (including himself) via the ForusVendor "addProvider"
 method

- _p_ can add a new artifact _a_ via the ForusVendor "addArtifact" method

- _p_ can set the value of _t_  to _a_

- _a_ of limited supply can have its supply increased or set via the ForusVendor 
"addAvailability" or "setAvailability" methods, respectively. 

### Step 4: requesting a token

- _r_ can request a token via the ForusVendor "requestFund" method, provided that
_r_ meets condition _ct_, triggering event "TokenGranted".

### Step 5: requesting an artifact

- _r_ can request an artifact via the ForusVendor "purchaseArtifact", provided that 
_r_ meets condition _ca_, triggering event "ArtifactBought".

- When _a_ is limited, event "ArtifactAvailabilityChanged" is triggered. 

- When _a_ is handed out, _t_ is transferred to a special wallet bound to _p_.

- _s_ can reclaim _t_, which will trigger event "TokenReturned"

### Conditions

_ca_

_ct_