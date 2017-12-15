pragma solidity ^0.4.17;

import { Owned } from './Owned.sol';
import { Validated } from './Validated.sol';

contract Token is Owned, Validated {

    uint private _fundSize;
    string private _name;

    function Token(string name, address owner, uint fundSize, string key, string operator, uint value) public Owned(owner) Validated(key, operator, value) {
        _fundSize = fundSize;
        _name = name;
    }
    
    function getFundSize() public view returns (uint fundSize) {
        return _fundSize;
    }

    function getName() public view returns (string name) {
        return _name;
    }
}