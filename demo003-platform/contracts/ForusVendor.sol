pragma solidity ^0.4.17;

import { Artifact } from './Artifact.sol';
import { Identity } from './Identity.sol';
import { IdentityManager } from './IdentityManager.sol';
import { Token } from './Token.sol';

contract ForusVendor {

    event ArtifactAdded(address artifact, address provider);
    event ArtifactAvailabilityChanged(address artifact, int availability);
    event ArtifactBought(address request, address provider, address token);
    event ArtifactPriceChanged(address artifact, address token, int newPrice);
    event TokenAdded(address token, address sponsor);
    event TokenGranted(address token, address sponsor, address requester, int amount);
    event TokenReturned(address token, address sponsor, address provider, int amount);

    // Ownership
    address _owner; 

    // Identity Manager
    IdentityManager private _identities;

    //Artifact List;
    mapping (uint => Artifact) _list;
    uint[] _knownArtifacts;
    uint _currentIndex = 1;

    // tokens
    address[] private _tokens;
    mapping (address => address[]) private _sponsorTokens;
    mapping (address => address[]) private _providerTokens;
    mapping (address => bool) private _sponsors;

    // Users
    mapping (address => Wallet) private _wallets;

    struct Wallet {
        mapping (address => int) balances;
    }

    modifier requireAcceptedToken(Artifact artifact, address token) {
        require(artifact.isValidToken(token));
        _;
    }

    modifier requireBalance(address identity, address token, int amount) {
        require(_wallets[identity].balances[token] >= amount);
        _;
    }

    modifier requireProvider(address identity, Artifact artifact) {
        require (artifact.isOwner(identity));
        _;
    }

    modifier requireSponsor(address account, address token) {
        require (isSponsor(account, token));
        _;
    }

    /*** GLOBAL METHODS */

    function ForusVendor(IdentityManager manager) public {
        _identities = manager;
        _owner = _identities.convertToIdentity(msg.sender);
    }

    function artifactExists(Artifact artifact) public view returns (bool exists) {
        for (uint i = 0; i < _knownArtifacts.length; i++) {
            if (address(artifact) == address(_list[i])) {
                return true;
            }
        }
        return false;
    }

    function getArtifactCount() public view returns (uint count) {
        return _knownArtifacts.length;
    }

    function sender() private returns (address identityAddress) {
        return _identities.convertToIdentity(msg.sender);
    }

    /*** REQUESTER METHODS */
    function purchase(Artifact artifact, Token token) public requireBalance(sender(), token, artifact.getPrice(token)) requireAcceptedToken(artifact, token) {
        _wallets[sender()].balances[token] -= artifact.getPrice(token);
        bool stockChanged = false;
        int newStock = 1;
        (stockChanged, newStock) = artifact.removeStock(-1);
        if (stockChanged) {
            ArtifactAvailabilityChanged(artifact, newStock);
        } 
    }

    function requestFund(address token) public {
        Identity identity = _identities.convertToIdentity(msg.sender);
        identity.addPermission(token);
        if (Token(token).validate(identity)) {
            _wallets[identity].balances[token] += Token(token).getFundSize();
            TokenGranted(token, Token(token).getOwner(), identity, Token(token).getFundSize());
        }
    }

    /*** VALIDATOR METHODS */


    /*** PROVIDER METHODS */
    function addStock(Artifact artifact, int add) public requireProvider(sender(), artifact) {
        artifact.addStock(add);
    }

    function addArtifact(Artifact artifact) public {
        require (!artifactExists(artifact));
        _list[++_currentIndex] = (artifact);
        _knownArtifacts.push(_currentIndex);
        ArtifactAdded(artifact, sender());
    }

    function createArtifact(bool limited, int available, string validationKey, string validationOperator, uint validationValue) public {
        Identity identity = Identity(sender());
        _list[++_currentIndex] = new Artifact(identity, limited, available, validationKey, validationOperator, validationValue);
        _knownArtifacts.push(_currentIndex);
        ArtifactAdded(_list[_currentIndex], sender());
    }

    function getBalance(address token) public view returns (int balance) {
        address identity = _identities.getIdentityOf(msg.sender);
        if (identity == 0) {
            return 0;
        }
        return _wallets[identity].balances[token];
    }

    function getBalanceOf(address identity, address token) public view returns (int balance) {
        return _wallets[identity].balances[token];
    }

    function setAvailability(Artifact artifact, int newAvailable) public requireProvider(sender(), artifact) {
        artifact.setStock(newAvailable);
    }

    function setArtifactPrice(address token, Artifact artifact, int price) public requireProvider(sender(), artifact) {
        artifact.setPrice(token, price);
        ArtifactPriceChanged(artifact, token, price);
    }

    /*** SPONSOR METHODS */
    function addProvider(address providerIdentity, Token token) public requireSponsor(msg.sender, token) {
        _providerTokens[providerIdentity].push(token);
    }

    function addToken(string name, int fundSize, string validationKey, string validationOperator, uint validationValue) public {
        address identity = _identities.convertToIdentity(msg.sender);
        Token token = new Token(name, identity, fundSize, validationKey, validationOperator, validationValue);
        _tokens.push(token);
        _sponsorTokens[identity].push(token);
        _sponsors[identity] = true;
        TokenAdded(token, identity);
    }

    function isSponsor(address account, address token) public returns (bool sponsor) {
        address identity = _identities.convertToIdentity(account);
        if (_sponsorTokens[identity].length > 0) {
            for (uint i = 0; i < _sponsorTokens[identity].length; i++) {
                if (token == _sponsorTokens[identity][i]) {
                    return true;
                }
            }
        } 
        return false;
    }
}