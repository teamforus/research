## poc013-Zero-knowledge-proofing

### Background / Context
**Goal:** The goal of this project is to better understand zkp and to be able to tell in which situation it is useful.

### Hypothesis:
Suppose Alice wants to prove to Bob that she knows a certain x and a certain y without telling bob the actual values. How would she prove this?

### Assignee: Niels Reijn

### Method
To give an example of a zero-knowledge proof without getting too difficult:

Example 1

Suppose there exists a new deck of cards. Alice picks a card, looks at it and puts it upside down on the table. How can Alice prove something about this card, without revealing it? 
Simple, if the taken card was red, give the black half of the deck to Bob. He can count the card to see that all black cards are present. Therefor the taken card must be red.

Example 2

Imagine there are 2 pens, a red and a blue pen. Alice can see which is which because she knows the secret but Bob doesn’t. To show this, Bob will be made colorblind. Alice will give the 2 pens to Bob and asks him to take them behind his back and choose to switch them, or not to switch them. When Bob reveals the pens, Alice is able to determine if he made the switch or not. There is a 50% chance to guess correct at random, so this process is repeated multiple times. Because Alice will be correct 100% of the time, this proves that Alice knows something about the pens without revealing which pen is red and which one is blue.



### Result
*present findings*

### Recommendation
*write recomendation*
