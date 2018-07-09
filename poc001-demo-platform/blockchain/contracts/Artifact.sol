pragma solidity ^0.4.17;

import { Identity } from './Identity.sol';
import { Owned } from './Owned.sol';
import { Validated } from './Validated.sol';

contract Artifact is Owned, Validated {

    function Artifact(Identity owner, string key, string operator, uint value) public Owned(address(owner)) Validated(key, operator, value) {}
    
}