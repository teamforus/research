pragma solidity ^0.4.17;

import { Identity } from './Identity.sol';

contract Validated {

    string public _validationKey;
    string public _validationOperator;
    uint public _validationValue;

    modifier requiresPermissionFrom(Identity identity) {
        require(hasPermission(identity));
        _;
    }

    function Validated(string key, string operator, uint value) public {
        _validationKey = key;
        _validationOperator = operator;
        _validationValue = value;
    }

    function getValidOperators() public pure returns (bytes32[6] operators) {
        bytes32[6] memory ret;
        ret[0] = "<";
        ret[1] = "<=";
        ret[2] = "==";
        ret[3] = ">=";
        ret[4] = ">";
        ret[5] = "!=";
        return ret;
    }

    function hasPermission(Identity identity) public view returns (bool has) {
        return identity.hasPermission(address(this));
    }

    function isValidOperator(string operator) public pure returns (bool) {
        bytes32[6] memory operators = getValidOperators();
        for (uint i = 0; i < operators.length; i++) {
            if (sha256(operator) == sha256(operator)) {
                return true;
            }
        }
        return false;
    }

    function validate(Identity identity) public view returns (bool isValid) {
        var ( value, voteCount ) = identity.getValue(_validationKey);
        bytes32 operator = sha256(_validationOperator);
        if (voteCount > 0) {
            if (operator == sha256(">=")) {
                return value >= _validationValue;
            } else if (operator == sha256("<=")) {
                return value <= _validationValue;
            } else if (operator == sha256("==")) {
                return value == _validationValue;
            } else if (operator == sha256("!=")) {
                return value != _validationValue;
            } else if (operator == sha256(">")) {
                return value > _validationValue;
            } else if (operator == sha256("<")) {
                return value < _validationValue;
            } 
        }
        return false;
    }

}