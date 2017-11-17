pragma solidity ^0.4.17;

contract IdentityManager {
    // double reference for quick searching
    mapping ( uint => Identity ) _identities;
    mapping ( address => uint ) _index;
    uint _currentIndex = 0;

    struct Identity {
        address pointer; // the address of the user it represents
        uint[] validators; // the addresses of the identities of the validators
    }

    modifier requiresExistanceOf(uint index) {
        require(identityExists(index));
        _;
    }

    modifier requiresValidatorOf(uint index) {
        require(identityExists(index));
        require(isValidatorOf(index, _index[msg.sender]));
        _;
    }

    function addressKnown(address account) public view returns (bool) {
        return _index[account] > 0;
    }

    function addValidator(address newValidator) public {
        require(addressKnown(msg.sender));
        require(addressKnown(newValidator));
        uint index = _index[msg.sender];
        uint valIndex = _index[newValidator];
        _identities[index].validators.push(valIndex);
    }

    function convertIdentity(address account) public returns (uint) {
        if (!addressKnown(account)) {
            createIdentity(account);
        }
        return _index[account];
    }

    function createIdentity(address account) private returns (uint) {
        uint index = ++_currentIndex;
        _identities[index] = Identity({
            pointer: account, 
            validators: new uint[](0)
        });
        _index[account] = index;
        return index;
    }

    function equals(uint identity, address account) public view returns (bool) {
        if (addressKnown(account) && identityExists(identity)) {
            return identity == _index[account];
        }
        return false;
    }

    function getAddress(uint index) private view returns (address account) {
        return _identities[index].pointer;
    }

    function getIdentity(address account) public view returns (uint identity) {
        return _index[account];
    }

    function identityExists(uint index) public view returns (bool exists) {
        return _identities[index].pointer != 0;
    }

    function isSender(uint identity) public view returns (bool) {
        return (_identities[identity].pointer == msg.sender);
    }

    function isValidatorOf(uint identity, uint validator) private view returns (bool) {
        for (uint i = 0; i < _identities[identity].validators.length; i++) {
            if (_identities[identity].validators[i] == validator) {
                return true;
            }
        }
        return false;
    }

    function recover(uint index, address newPointer) public requiresValidatorOf(index) {
        address oldPointer = _identities[index].pointer;
        _identities[index].pointer = newPointer;
        _index[oldPointer] = 0;
        _index[newPointer] = index;
    }

    function removeValidator(uint validator) public {
        require(addressKnown(msg.sender));
        uint index = _index[msg.sender];
        for (uint i = 0; i < _identities[index].validators.length; i++) {
            if (_identities[index].validators[i] == validator) {
                delete _identities[index].validators[i];
                return;
            }
        }
    }

    function stopValidatingFor(uint identity) public requiresExistanceOf(identity) requiresValidatorOf(identity) {
        require(addressKnown(msg.sender));
        uint valIndex = _index[msg.sender];
        for (uint i = 0; i < _identities[identity].validators.length; i++) {
            if (_identities[identity].validators[i] == valIndex) {
                delete _identities[identity].validators[i];
                return;
            }
        }
    } 
}

/*contract Identity {

    address private _address;
    // allow null-checks
    bool private _exists = false;
    address[] private _validators;

    function Identity(address identity) public payable {
        _address = identity;
        _validators = [identity];
        _exists = true;
    }

    function addValidator(address validator) public {
        _validators.push(validator);
    }

    function exists() public view returns (bool) {
        return _exists;
    }

    function matches(address addr) public view returns (bool equals) {
        return _address == addr;
    }

    function recoverIdentity(address newIdentity) public returns (bool success) {
        bool allowed = false;
        for (uint index = 0; index < _validators.length; index ++) {
            if (_validators[index] == msg.sender) {
                allowed = true;
            }
        }
        if (allowed) {
            _address = newIdentity;
            return true;
        }
        return false;
    }

    function removeValidator(address validator) public returns (bool success) {
        for (uint index = 0; index < _validators.length; index ++) {
            if (_validators[index] == validator) {
                delete _validators[index];
                return true;
            }
        }
        return false;
    }
    
}*/