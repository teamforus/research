pragma solidity ^0.4.17;

import { Owned } from './Owned.sol'; 

contract Identity is Owned {

    modifier requiresPermission(address sender) {
        require(_approvedCallers[sender] || isOwner(sender));
        _;
    }

    mapping (address => bool) private _approvedCallers;
    mapping (string => Voting) private _values;

    struct Voting {
        // Validator/voter => value
        uint highestVote;
        mapping (address => uint) votes;
        address[] validators;
    }

    function Identity() public Owned(msg.sender) {}

    function addPermission(address caller) public requiresOwner {
        _approvedCallers[caller] = true;
    }

    function getHighestVote(string name) public view returns (uint) {
        return _values[name].highestVote;
    }

    function getValue(string name) public requiresPermission(msg.sender) view returns (uint value, uint voteCount) {
        uint highestVote = getHighestVote(name);
        // value => votes
        uint[] memory counting = new uint[](highestVote);
        // For readabilitiy
        uint currentValue;
        for (uint i = 0; i < _values[name].validators.length; i++) {
            currentValue = _values[name].votes[_values[name].validators[i]];
            counting[currentValue]++;
        }
        uint highestCount = 0;
        uint highestValue = 0;
        for (i = 0; i < counting.length; i++) {
            if (counting[i] > highestCount) {
                highestValue = i;
                highestCount = counting[i];
            }
        }
        return (highestValue, highestCount);
    }   

    function hasPermission(address caller) public view returns(bool has) {
        return _approvedCallers[caller] || isOwner(caller);
    }

    function removePermission(address caller) public requiresOwner {
        _approvedCallers[caller] = false;
    }

    function vote(string name, uint value) public {
        _values[name].validators.push(msg.sender);
        _values[name].votes[msg.sender] = value;
        if (_values[name].highestVote < value) {
            _values[name].highestVote = value;
        }
    }
    
}