pragma solidity ^0.4.18;

import { Erc20Interface } from './Erc20Interface.sol';
import { Owned } from './Owned.sol';

contract SalvTokenInterface is Erc20Interface, Owned {

    uint private _available;
    // mapping (owner/from => mapping ( spender => amount ));
    mapping (address => mapping (address => uint)) _allowed;
    mapping (address => uint) private _spentTokens;
    mapping (address => uint) private _unspentTokens;

    modifier requiresAllowance(address from, address to, uint amount) {
        require(allowance(from, to) >= amount);
        _;
    }

    modifier requiresEnough(address from, uint amount) {
        require(_unspentTokens[from] >= amount);
        _;
    }

    function SalvTokenInterface(uint total) public Owned(msg.sender) {
        _available = total;
    }

    function allowance(address owner, address spender) public view returns (uint remaining) {
        return _allowed[owner][spender];
    }

    function approve(address spender, uint value) public requiresEnough(msg.sender, value) returns (bool success) {
        bool newHasAdded = value > _allowed[msg.sender][spender];
        uint difference = 0;
        if (newHasAdded) {
            difference = value - _allowed[msg.sender][spender];
            _unspentTokens[msg.sender] -= difference;
        } else {
            difference = _allowed[msg.sender][spender] - value;
            _unspentTokens[msg.sender] += difference;
        }
        _allowed[msg.sender][spender] = value;
        Approval(msg.sender, spender, value);
        return true;
    }

    function balanceOf(address account) public view returns (uint balance) {
        return getUnspentTokens(account);
    }

    function getSpentTokens(address account) public view returns (uint balance) {
        return (_spentTokens[account]);
    }

    function getUnspentTokens(address account) public view returns (uint balance) {
        return (_unspentTokens[account]);
    }

    function totalSupply() public view returns (uint available) {
        return _available;
    }

    function transfer(address to, uint value) public requiresEnough(msg.sender, value) returns (bool success) {
        _unspentTokens[msg.sender] -= value;
        _spentTokens[to] += value;
        Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public requiresAllowance(from, msg.sender, value) returns (bool success) {
        _allowed[from][msg.sender] -= value;
        _spentTokens[to] += value;
        Transfer(from, to, value);
        return true;
    }

}
