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
        require(_approvedCallers[sender] || isOwner(sender));
        _;
    }

    mapping (address => bool) private _approvedCallers;
    address _owner;
    address[] private _menders;
    mapping (string => Voting) private _values;

    struct Voting {
        // Validator/voter => value
        uint highestVote;
        mapping (address => uint) votes;
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

    function vote(string name, uint value) public {
        _values[name].validators.push(msg.sender);
        _values[name].votes[msg.sender] = value;
        if (_values[name].highestVote < value) {
            _values[name].highestVote = value;
        }
    }
    
}