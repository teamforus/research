pragma solidity ^0.4.17;

import { IdentityManager } from './IdentityManager.sol';

// Use this contract by making a contract as "contact <name> is Owned(<IdentityManager's Address>, <owner address or msg.sender>)"
contract Owned {
    uint private _ownerId;
    IdentityManager private _identityManager;

    modifier requiresOwner() {
        require(isOwner(msg.sender));
        _;
    }

    function isOwner(address account) public view returns(bool) {
        return _identityManager.equals(_ownerId, account);
    }

    function Owned(address identityManagerAddress, address account) public {
        // Cannot be done using setIdentityManagerAddress, due to the fact that the
        // IdentityManager is required to generate _ownerId, which in turn is 
        // nessecary for the set method.
        _identityManager = IdentityManager(identityManagerAddress);
        setOwnerByAddress(account);
    }

    function setIdentityManagerAddress(address identityManagerAddress) public requiresOwner {
        // todo: Would like to validate that the address actually is an IdentityManager script. 
        _identityManager = IdentityManager(identityManagerAddress);
    }

    function setOwner(uint identity) public requiresOwner {
        _ownerId = identity;
    }

    function setOwnerByAddress(address ownerAddress) private {
        _ownerId = _identityManager.convertAddress(ownerAddress);
    }
    
}