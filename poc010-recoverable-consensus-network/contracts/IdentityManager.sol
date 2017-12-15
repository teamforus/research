pragma solidity ^0.4.17;

import { Identity } from './Identity.sol'; 

/**
    Contract to map identities to uints
 */
contract IdentityManager {
    // Added for testing purposes
    event IdentityCreated(address newIdentity);

    // double reference for quick searching
    mapping ( uint => Identity ) _identities;
    mapping ( address => uint ) _index;
    uint _currentIndex = 0;

    modifier requiresExistanceOf(uint index) {
        require(identityExists(index));
        _;
    }

    modifier requiresIdentity(Identity instance) {
        // TODO make actual check. Now only checks if address is not null
        require(address(instance) != 0);
        _;   
    }

    function addressKnown(address account) public view returns (bool) {
        return _index[account] > 0;
    }

    function convertAddress(address account) public returns (uint identifier) {
        if (!addressKnown(account)) {
            address newIdentity = createIdentity(account);
            IdentityCreated(newIdentity);
        }
        return _index[account];
    }

    function createIdentity(address account) private returns (Identity) {
        uint index = ++_currentIndex;
        Identity identity = new Identity(account);
        _identities[index] = identity; 
        _index[address(identity)] = index;
        return identity;
    }

    function equals(uint identifier, address account) public view returns (bool) {
        if (addressKnown(account) && identityExists(identifier)) {
            return identifier == _index[account];
        }
        return false;
    }

    function getAddress(uint identifier) private view returns (address account) {
        return address(_identities[identifier]);
    }

    function getIdentity(address account) public view returns (uint identifier) {
        return _index[account];
    }

    function identityExists(uint identifier) public view returns (bool exists) {
        return address(_identities[identifier]) != 0;
    }

}