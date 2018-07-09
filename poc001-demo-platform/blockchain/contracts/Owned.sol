pragma solidity ^0.4.17;

contract Owned {
    event NewOwner(address newOwner);

    address private _owner;

    modifier requiresOwner(address identity) {
        require(isOwner(identity));
        _;
    }

    function Owned(address owner) public {
        _owner = owner;
    }

    function getOwner() public view returns (address owner) {
        return (_owner);
    }

    function isOwner(address identity) public view returns (bool) {
        return _owner == identity;
    }

    function setOwner(address identity) public requiresOwner(msg.sender) {
        _owner = identity;
    }
}