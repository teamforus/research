# poc005-host-frontend-on-ipfs

## Background / Context
**Goal: ** The goal of this proof of concept is to host a front-end application on a decentralized network. 

## Hypothesis:
During development of an application, it is possible to host the necessary files on IPFS.

## Assignee: Niels Reijn

## Method
Firstly, we will explore IPFS alone. How is it installed and how is it used? After that we will look into combining IPFS with blockchain.

## Installation

### Windows
1. After downloading, unzip the archive, and move ipfs.exe somewhere in your %PATH%.
2. $ ipfs init
3. $ ipfs daemon
4. $ ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
5. $ open http://localhost:5001/webui

### Mac/Linux
1. $ brew install ipfs
2. $ ipfs init
3. $ ipfs daemon
4. $ ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/quick-start
5. $ open http://localhost:5001/webui

### Uploading files
1. $ echo "# test" >> README.md
2. $ ipfs add README.md
3. $ (To upload an entire directory use $ ipfs add -r <folderName>)
4. $ ipfs cat /ipfs/<returned hash>

### Retrieving files
1. $ ipfs cat /ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg > cat.jpg
2. $ open cat.jpg

## IPFS with Embark
Embark features IPFS integration which allows us to deploy our dapp to a chain instantly.
This can be either a simulator but also a real testnet.

To give an example you may do:

1. $ embark demo
2. $ cd embark_demo
3. $ (new window) embark simulator
4. $ (new window) ipfs daemon
5. $ embark run

This will serve our application locally and prove that we have a working dapp.
Next, we can deploy our front-end to the simulator using:

$embark upload ipfs

Embark will upload our build folder and return a hash to the root of that folder on our IPFS node. It will look something like: 

http://localhost:8080/ipfs/QmV2chfGXp2bsQN2xcdeUfq9PQGSHG96As2vRF4ogLR6vg/

## Result
IPFS is easy to use and provides alternative to centralized web servers. 

| IPFS   |      HTTPS      |
|----------|-------------:|
| col 1 is |  left-aligned |
| col 2 is |    centered   |
| col 3 is | right-aligned |


## Recommendation
My advice, taking blockchain into account, is to first design a dapp to use a centralized web server. When all the functionality Is completed and the application is tested, it is then possible to easily migrate to an IPFS environment.

