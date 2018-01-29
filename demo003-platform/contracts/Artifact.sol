pragma solidity ^0.4.17;

import { Identity } from './Identity.sol';
import { Owned } from './Owned.sol';
import { Validated } from './Validated.sol';

contract Artifact is Owned, Validated {

    event PriceChanged(address token, int price);
    event StockChanged(int newStock);

    int private _available;
    bool private _limited;
    mapping (address => int) private _prices;
    mapping (address => bool) private _vendors;

    modifier requiresVendor(address sender) {
        require (isVendor(sender) || isOwner(sender));
        _;
    }

    function Artifact(Identity owner, bool limited, int available, string key, string operator, uint value) public Owned(address(owner)) Validated(key, operator, value) {
        _available = available;
        _limited = limited;
    }

    function addStock(int stock) public {
        _available += stock;
        StockChanged(_available);
    }

    function addVendor(address vendor) public requiresOwner(msg.sender) {
        _vendors[vendor] = true;
    }

    function getPrice(address token) public view returns (int price) {
        return _prices[token];
    }

    function getStock() public view returns (int stock) {
        return _available;
    }

    function isLimited() public view returns (bool limited) {
        return _limited;
    }

    function isValidToken(address token) public view returns (bool valid) {
        return _prices[token] > 0;
    } 

    function isVendor(address vendor) public view returns (bool) {
        return (_vendors[vendor]);
    }

    function removeStock(int amount) public requiresVendor(msg.sender) returns (bool stockChanged, int newStock) {
        newStock = _available - amount;
        return (setStock(newStock), newStock);
    }

    function removeVendor(address vendor) public requiresOwner(msg.sender) {
        _vendors[vendor] = false;
    }

    function setPrice(address token, int price) public requiresVendor(msg.sender) {
        _prices[token] = price;
        PriceChanged(token, price);
    }

    function setStock(int newStock) public requiresVendor(msg.sender) returns (bool stockChanged) {
        if (_limited) {
            _available = newStock;
            StockChanged(newStock);
        }
        return (_limited);
    }
}