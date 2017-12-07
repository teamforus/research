pragma solidity ^0.4.17;

contract Owned {
    address _owner;

    modifier requiresOwner() {
        require(isOwner(msg.sender));
        _;
    }

    function Owned(address owner) public {
        _owner = owner;
    }

    function isOwner(address account) public view returns(bool) {
        return account == _owner;
    }

    function setOwner(address newOwner) public requiresOwner {
        _owner = newOwner;
    }
    
}