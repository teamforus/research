import { Artifact } from './artifact';
import { Injectable } from '@angular/core';
import * as Web3 from 'web3/src/';

@Injectable()
export class ArtifactService {

  host = 'ws://localhost:8546';
  contractAddress = '0x5dba61bb905b9b2a7d81cabcff8b35a808ac04d0';
  contractABI = [
    {
      'inputs': [
        {
          'name': 'name',
          'type': 'string'
        },
        {
          'name': 'limited',
          'type': 'bool'
        },
        {
          'name': 'available',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function',
      'constant': false,
      'name': 'addArtifact',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ]
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': 'val1',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'val2',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'name',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'limited',
          'type': 'bool'
        },
        {
          'indexed': false,
          'name': 'available',
          'type': 'uint256'
        }
      ],
      'name': 'sum',
      'type': 'function',
      'payable': false,
      'stateMutability': 'view',
      'constant': true,
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ]
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': 'index',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'provider',
          'type': 'address'
        },
        {
          'indexed': false,
          'name': 'name',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'limited',
          'type': 'bool'
        },
        {
          'indexed': false,
          'name': 'available',
          'type': 'uint256'
        }
      ],
      'name': 'ArtifactAdded',
      'type': 'constructor',
      'payable': false,
      'stateMutability': 'nonpayable'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': false,
          'name': 'index',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'provider',
          'type': 'address'
        },
        {
          'indexed': false,
          'name': 'name',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'limited',
          'type': 'bool'
        },
        {
          'indexed': false,
          'name': 'available',
          'type': 'uint256'
        }
      ],
      'name': 'ArtifactAdded',
      'type': 'event'
    }
  ];
  contract = null;
  web3 = null;

  artifacts: Artifact[] = [];

  constructor() {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.host));

    this.contract = new this.web3.eth.Contract(
      this.contractABI,
      this.contractAddress
    );


    /*
    this.web3.eth.subscribe('newBlockHeaders', function(error, result){
      console.log(error);
      console.log(event);
    });
    */

    /*
    console.log('asdf');
    this.web3.eth.getTransactionCount('0x4046535b1d10505a40ca9e525c220b75d8201348').then(result => {
      console.log(result);
    });
    */

    this.contract.getPastEvents('ArtifactAdded', function(error, result){
      console.log(error);
      console.log(event);
    }).then(function(events){
      console.log(events); // same results as the optional callback above
    });

    this.contract.events.allEvents({}, function(error, result){
      console.log(error);
      console.log(event);
    })
    .on('data', function(event){
      console.log('data');
      console.log(event);
    })
    .on('changed', function(event){
      console.log('changed');
      console.log(event);
    })
    .on('error', function(error){
      console.log('error');
      console.log(error);
    });

    /*
    this.web3.eth.sendTransaction({
        from: '0x4046535b1d10505a40ca9e525c220b75d8201348',
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        value: '10000000000000'
    }, function(error, result){
      console.log(error);
      console.log(event);
    }).on('transactionHash', function(hash){
      console.log('transactionHash');
      console.log(hash);
  })
  .on('receipt', function(receipt){
    console.log('receipt');
    console.log(receipt);
  })
  .on('confirmation', function(confirmationNumber, receipt){
    console.log('confirmation');
    console.log(confirmationNumber);
    console.log(receipt);
  })
  .on('error', function(error){
    console.log('error');
    console.log(error);
  });
*/


this.web3.eth.getBalance('0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae')
.then(console.log);

    }

  addArtifact(
    name: string,
    limited: boolean,
    available: number
  ) {

    this.contract.methods.addArtifact(name, limited, available)
    .call({from: this.web3.eth.defaultAccount}, function(error, result)
    {
      if (!error) {
        console.log('result');
          console.log(result);
      } else {
        console.log('error');
          console.error(error);
      }
    });
  }

  // EVENTS

  artifactAdded(
    index: number,
    provider: string,
    name: string,
    limited: boolean,
    available: number
  ) {
    const artifact = new Artifact();
    artifact.id = index;
    artifact.name = name;
    artifact.available = available;
    artifact.limited = limited;
    artifact.provider = provider;

    this.artifacts[index] = artifact;
  }

  artifactAvailabilityChanged(
    index: number,
    availability: number
  ) {
      this.artifacts[index].available = availability;
  }

  artifactBought(
    request: string,
    provider: string,
    token: string
  ) {

  }

  artifactPriceChanged(
    index: number,
    token: string,
    newPrice: number
  ) {
    this.artifacts[index].prices[token] = newPrice;
  }

}
