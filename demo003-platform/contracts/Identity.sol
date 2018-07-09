pragma solidity ^0.4.17;

contract Identity {

    modifier requiresMender(address mender) {
        require(isMender(mender));
        _;    
    }

    modifier requiresOwner() {
        require(isOwner(msg.sender));
        _;
    }

    modifier requiresPermission(address sender) {
        require(hasPermission(sender));
        _;
    }

    mapping (address => bool) private _approvedCallers;
    address _owner;
    address[] private _menders;
    mapping (string => Voting) private _values;

    struct Voting {
        // Validator/voter => value
        uint highestVote;
        mapping (address => uint8) votes;
        address[] validators;
    }

    function Identity(address account) public {
        _owner = account;
    }

    function addMender(address newMender) public requiresOwner() {
        require(!isMender(newMender));
        _menders.push(newMender);
    }

    function addPermission(address caller) public {
        if (isOwner(msg.sender) || hasPermission(msg.sender)) {
            _approvedCallers[caller] = true;
        }
    }

    function getHighestVote(string name) public view returns (uint) {
        return _values[name].highestVote;
    }

    function getMenders() private view returns (address[] menders) {
        return _menders;
    }

    function getValue(string name) public view returns (uint8 value, uint voteCount) {
        //require (hasPermission(msg.sender));
        // value => votes
        uint8[255] memory counting;
        for (uint i = 0; i < _values[name].validators.length; i++) {
            address voter = _values[name].validators[i];
            counting[_values[name].votes[voter]]++;
        }
        uint highestCount = 0;
        uint8 highestValue = 0;
        for (uint8 j = 0; j < counting.length; j++) {
            if (counting[j] > highestCount) {
                highestValue = j;
                highestCount = counting[j];
            }
        }
        return (highestValue, highestCount);
    }   

    function hasPermission(address caller) public view returns(bool has) {
        return bool(_approvedCallers[caller]) || isOwner(caller);
    }

    function isMender(address mender) private view returns (bool) {
        address[] memory menders = getMenders();
        for (uint i = 0; i < menders.length; i++) {
            if (mender == menders[i]) {
                return true;
            }
        }
        return false;
    }

    function isOwner(address account) public view returns(bool) {
        return account == _owner;
    }

    function recover(address newOwner) public returns (bool success) {
        if (isMender(msg.sender) || isOwner(msg.sender)) {
            _owner = newOwner;
            return true;
        }
        return false;
    }

    function removeMender(address mender) public requiresOwner() requiresMender(mender) returns (bool success) {
        for (uint i = 0; i < _menders.length; i++) {
            if (_menders[i] == mender) {
                delete _menders[i];
                return true;
            }
        }
        return false;
    }

    function removePermission(address caller) public requiresOwner {
        _approvedCallers[caller] = false;
    }

    function vote(string name, uint8 value) public {
        _values[name].validators.push(msg.sender);
        _values[name].votes[msg.sender] = value;
        if (_values[name].highestVote < value) {
            _values[name].highestVote = value;
        }
    }
    
}