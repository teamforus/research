import { Artifact } from './artifact';
import { Injectable } from '@angular/core';
import * as Web3 from 'web3/src/';

@Injectable()
export class ArtifactService {

  host = 'http://localhost:8545';
  contractAddress = '0xeaa63fdcad6fc93762bf944b1f13d8bbf6d9b4fc';
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
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.host));

    this.contract = new this.web3.eth.Contract(
      this.contractABI,
      this.contractAddress
    );

    /*
    console.log(this.web3.eth.subscribe('logs', {}, function(error, result){
      console.log(error);
      console.log(event);
    }));
    */

    /*
    const eventEmitter = this.contract.events.ArtifactAdded();
    eventEmitter
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
    */

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
