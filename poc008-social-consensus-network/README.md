## poc008-social-consensus-network

### Background / Context
**Goal:** Create a network of identities, that people can use to verify attributes of other people. This way, social consensus can be assured. 

### Hypothesis:


### Assignee: Martijn Doornik

### Method
The `Identity` contract uses a simple voting mechanism to determine which value given by voters is correct. In order
to make sure no one votes on the most popular ansfer, but instead votes unknowingly (according to on-chain data), one
has to permit certain scripts via addresses to retrieve the result of a voting. 

### Result
The script is almost done. Two things are left to do:

1: the script should consider the weight of a voter. Someone who has voted more and was right more often should be more
valuable in voting than someone who just joined the network.

2: it is uncertain whether calls for data can be done unsigned and whether they _have_ to be signed in order to be used. 
Now, the getValue method requires a signature from the sender, but it is uncertain using Mist if this is applied 
succesfully. 

### Recommendation
The script is not yet done. It has been put on hold in order to tackle more feasible pocs. In the first weeks of 
2018, this poc is to be finished. 
