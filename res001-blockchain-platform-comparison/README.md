# Research: Blockchain platform comparison

A comparison between blockchain platform. 

##### List of terms

Proof of Stake PoS - A type of algorithm which uses network consensus to handle fault tolerance.

Proof of Work PoW - A type of algorithm which uses computing power to handle fault tolerance.

Byzantine Fault BF - A failure in which a node remains functional, but operates in a dishonest manner.

## Hypothesis:
There is alot of hype around Ethereum. 


#### Public

- Rootstock (Bitcoin doesnt support building dApps, checking out sidechain rootstock instead.)
http://rsk.co
- Ethereum
https://ethereum.org/
- EOS
http://eos.io
- NEO
http://neo.org
- NEM
http://nem.io

#### Private

- Multichain      
- Hyperledger     
- COCO            
- IBM Blockchain  
- Mijin


## Method

- Funders, developers
- Consensus Mechanism
- Incentive
- Programming language
- Community
- Scalability


## Results

### Public Platform Market Cap

| Name       | Market Cap          | Circulating supply  |
| ------------- |:-------------:| -----:|
| Bitcoin      | $284,762,874,568 | 16,736,225 BTC |
| Ethereum     | $55,638,467,164  | 96,292,534 ETH |
| NEM          | $4,797,107,999   | 8,999,999,999 XEM * |
| EOS          | $2,568,238,641   | 534,548,018 EOS *	 |
| NEO          | $2,453,256,000   | 65,000,000 NEO * |

*Not Mineable

### Funders

#### Public

| Name       | Funders          | Location  |
| ------------- |:-------------:| -----:|
| Rootstock      | RSK Labs, company | Buenos Aires, Argentina |
| Ethereum     | Ethereum Foundation, non-profit and Enterprise Ethereum Alliance | Zürich, Switzerland |
| EOS          | block.one, company and Dan Larrimer (STEEM,BitShares) | Canada |
| NEO          | Onchain, company and chinese investers (alibaba, chinese government)  | Shanghai/Beijing, China |
| NEM          | NEM.io foundation, non-profit  | Singapore |

  
#### Private

  ##### Multichain
  Coin Sciences, a Tel Aviv based company (Israel)
  
  ##### Hyperledger 
  Linux Foundation, San Francisco, California
  
  ##### CoCo 
  Microsoft, Redmond, Washington
  
  ##### IBM Blockchain
  IBM, Armonk, New York
  
  ##### Mijin
  Tech Bureau, Osaka, Japan
  
### Consensus mechanism
#### Rootstock, PoW
Proof of Work. Rootstock is a Sidechain of Bitcoin and can be merge-mined.
The merge-mining functionality allows Bitcoin miners to mine in both chains with almost no extra cost. This will provide them extra revenues based on fees and allow them to participate in the smart contracts business.

#### Ethereum, PoW
Proof of Work.

#### EOS, dPoS
Delegated Proof of Stake. Under dPoS, those who hold tokens on a blockchain adopting the EOS.IO software may select block producers through a continuous approval voting system and anyone may choose to participate in block production and will be given an opportunity to produce blocks proportional to the total votes they have received relative to all other producers.

#### NEO, dBFT
Delegated Byzantine Fault Tolerance. dBFT protocol occurs through a “gamified” form of block verification among professional node operators. All of these professional nodes are appointed by ordinary nodes through a delegated voting process. The professional node broadcasts its version of the blockchain to the network. If 66% of the other nodes agree with the information, consensus is achieved. Should this threshold not be met, a different professional node is appointed to broadcast its blockchain version until consensus can be established.

#### NEM, PoI
Proof of Importance. PoI is the algorithm used in NEM to time stamp transactions. A NEM user's importance is determined by how many coins they have and the number of transactions made to and from their wallet. POI uses the NCDawareRank network centrality measure, the topology of the transaction graph, as well as a number of other relevant signals to achieve consensus.

### Fueling the blockchain (incentive)

#### Rootstock
Bitcoin rewards when merge mined by bitcoin miners. The smart bitcoins mined through RSK would power the startup's smart contract ecosystem. Whoever owns / ends up owning the RTC on the sidechain can get the Bitcoin back that were locked on the Bitcoin main blockchain to create the RTC. So if a miner gets fees in RTC they actually own Bitcoin as soon as they unlock them again on the mainchain. Bitcoin miners get RTC in the rootstock sidechain that can unlock bitcoins in the main chain.

#### Ethereum
The fundamental unit of computation is "gas"; usually, a computational step costs 1 gas, but some operations cost higher amounts of gas because they are more computationally expensive, or increase the amount of data that must be stored as part of the state. There is also a fee of 5 gas for every byte in the transaction data. The intent of the fee system is to require an attacker to pay proportionately for every resource that they consume, including computation, bandwidth and storage; hence, any transaction that leads to the network consuming a greater amount of any of these resources must have a gas fee roughly proportional to the increment. 

#### EOS
Separating Transaction costs from Token Value; One of the major benefits of the EOS.IO software is that the amount of bandwidth available to an application is entirely independent of any token price. If an application owner holds a relevant number of tokens, then the application can run indefinitely within a fixed state and bandwidth usage. Developers and users are unaffected from any price volatility in the token market and therefore not reliant on a price feed. The EOS.IO software enables block producers to naturally increase bandwidth, computation, and storage available per token independent of the token's value.

The EOS.IO software awards block producers tokens every time they produce the block. The value of the tokens will impact the amount of bandwidth, storage, and computation a producer can afford to purchase; this model naturally leverages rising token values to increase network performance.

#### NEO
GAS is the fuel token for the realization of NEO network resource control, with a maximum total limit of 100 million. The NEO network charges for the operation and storage of tokens and smart contracts, thereby creating economic incentives for bookkeepers and preventing the abuse of resources. The minimum unit of GAS is 0.00000001

#### NEM
The process of creating new blocks is called harvesting. The harvesting account gets the
fees for the transactions in the block. This gives the harvester an incentive to add as
many transactions to the block as possible. Any account that has a vested balance of at
least 10,000 XEM is eligible to harvest.

NEM also has a supernode program, funded with XEM, set aside during Nemesis block.

### Programming language Smart Contracts

#### Rootstock, Solidity

#### Ethereum, Solidity

#### EOS, C++

#### NEO, C# and Java 

#### NEM, any language off-chain
"Smart Contracts are not on blockchain. This is by design as on chain smart contracts have posed serious risk for other blockchains, have presented scalability issues, and can lead to too much resources being wasted on the deployment of it. For NEM, smart contracts can be executed off chain, such as on company servers, and the transactions can be recorded on the blockchain through the NEM API. Instead on chain smart contracts, the below customizable smart assets can be used on chain." 

### Community

| Name       | Twitter         | Reddit  | Github Contributors |
| ------------- |:-------------:|:-------------:|-----:|
| Rootstock      | 13k | 443 | 17 |
| Ethereum     | 229k  | 194k | 200 |
| EOS          | 148k   | 4k	 | 51 |
| NEO          | 85k   | 44k | 17 |
| NEM          | 43k  | 10k | 3 |

### Scalability

#### Rootstock

Public testnet
No record of public heavy use, still in testnet.

#### Ethereum

Production Release
10 tx/s on heavy use

#### EOS

Public testnet
No record of public heavy use, still in testnet.

#### NEO

Production release
no heavy use yet, it now takes 15 a 20 sec to generate a block.
each block now has around 10 transactions. 

Neo says it can handle up to 1000 tranaction per second.

#### NEM

Stable release
no heavy use yet. 1 block per minute. There is a 120 transaction per block limit. NEM is handling 2 transactions per second.
A new version is released soon and can handle more transactions per second.

## Recommendation
*write recomendation*
