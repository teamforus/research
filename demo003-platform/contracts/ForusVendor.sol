pragma solidity ^0.4.17;

import { Artifact } from './Artifact.sol';
import { Identity } from './Identity.sol';
import { IdentityManager } from './IdentityManager.sol';
import { Token } from './Token.sol';

contract ForusVendor {

    event ArtifactAdded(uint index, address provider, string name, bool limited, uint available);
    event ArtifactAvailabilityChanged(uint index, uint availability);
    event ArtifactBought(address request, address provider, address token);
    event ArtifactPriceChanged(uint index, address token, uint newPrice);
    event TokenAdded(address token, address sponsor);
    event TokenGranted(address token, address sponsor, address requester, uint amount);
    event TokenReturned(address token, address sponsor, address provider, uint amount);

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

    struct Artifact {
        string name;
        uint available;
        bool limited;
        address provider;
        mapping (address => uint) tokenPrices;
    }

    struct Wallet {
        mapping (address => uint) balances;
    }

    modifier requireAcceptedToken(uint artifact, address token) {
        require(_list[artifact].tokenPrices[token] > 0);
        _;
    }

    modifier requireBalance(address identity, address token, uint amount) {
        require(_wallets[identity].balances[token] >= amount);
        _;
    }

    modifier requireProvider(address identity, uint artifact) {
        require (_list[artifact].provider == identity);
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

    function artifactExists(uint index) public view returns (bool exists) {
        for (uint i = 0; i < _knownArtifacts.length; i++) {
            if (index == _knownArtifacts[i]) {
                return true;
            }
        }
        return false;
    }

    function getArtifactByIndex(uint index) public view returns (string name, bool limited, uint available) {
        return (_list[index].name, _list[index].limited, _list[index].available);
    }

    function getArtifactCount() public view returns (uint count) {
        return _knownArtifacts.length;
    }

    function sender() private returns (address identityAddress) {
        return _identities.convertToIdentity(msg.sender);
    }

    /*** REQUESTER METHODS */
    function purchase(uint index, address token) public requireBalance(sender(), token, _list[index].tokenPrices[token]) requireAcceptedToken(index, token) {
        _wallets[sender()].balances[token] -= _list[index].tokenPrices[token];
        if (_list[index].limited) {
            _list[index].available -= 1;
            ArtifactAvailabilityChanged(index, _list[index].available);
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
    function addAvailability(uint index, uint add) public requireProvider(sender(), index) {
        _list[index].available += add;
    }

    function addArtifact(string name, bool limited, uint available) private {
        _list[++_currentIndex] = (Artifact({name: name, limited: limited, available: available, provider: sender()}));
        _knownArtifacts.push(_currentIndex);
        ArtifactAdded(_currentIndex, sender(), name, limited, available);
    }

    function addLimitedArtifact(string name, uint available) public {
        addArtifact(name, true, available);
    }

    function addUnlimitedArtifact(string name) public {
        addArtifact(name, false, 0);
    }

    function getBalance(address token) public view returns (uint balance) {
        address identity = _identities.getIdentityOf(msg.sender);
        if (identity == 0) {
            return 0;
        }
        return _wallets[identity].balances[token];
    }

    function getBalanceOf(address identity, address token) public view returns (uint balance) {
        return _wallets[identity].balances[token];
    }

    function setAvailability(uint index, uint newAvailable) public requireProvider(sender(), index) {
        _list[index].available = newAvailable;
    }

    function setArtifactPrice(address token, uint index, uint price) public requireProvider(sender(), index) {
        _list[index].tokenPrices[token] = price;
        ArtifactPriceChanged(index, token, price);
    }

    /*** SPONSOR METHODS */
    function addProvider(address providerIdentity, Token token) public requireSponsor(msg.sender, token) {
        _providerTokens[providerIdentity].push(token);
    }

    function addToken(string name, uint fundSize, string validationKey, string validationOperator, uint validationValue) public {
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