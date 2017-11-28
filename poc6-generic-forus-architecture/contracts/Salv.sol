pragma solidity ^0.4.18;

import { Owned } from './Owned.sol';

contract Salv is Owned(msg.sender) {
    
    event IdentityValidated(address account, address validator);
    event FundRequested(address applicant, address sponsor, address token);
    event FundQueued(address applicant, address sponsor, address token);
    event FundGranted(address applicant, address sponsor, address token, uint newBalance);
    event TokenSpent(address applicant, address token, address supplier, uint price, string product, uint newBalance);
    event TokenExchanged(address supplier, address sponsor, address token, uint amountExchanged);

    /*modifier requiresOpenRequest(address token, address applicant) {
        require(hasOpenRequest(applicant));
        _;
    }*/

    modifier requiresBalanceOf(address token, uint amount, address account) {
        require(_tokens[token].wallets[account].balance >= amount);
        _;
    }

    modifier requiresInvalidArtifact(address token, uint artifact) {
        require(!isArtifactValid(token, artifact));
        _;
    }

    modifier requiresNoOpenRequest(address token, address applicant) {
        bool ret = hasOpenRequest(token, applicant);
        require(ret == false);
        _;
    }

    modifier requiresNotSponsor(address token, address account) {
        require(!isSponsor(token, account));
        _;
    }

    modifier requiresNotValidatedBy(address validator, address token, address account) {
        require(!isAccountValidatedBy(validator, token, account));
        _;
    }

    modifier requiresSponsor(address token, address account) {
        require(isSponsor(token, account));
        _;
    }

    modifier requiresValidated(address token, address account) {
        require(isAccountValidated(token, account));
        _;
    }

    modifier requiresValidArtifact(address token, uint artifact) {
        require(isArtifactValid(token, artifact));
        _;
    }

    mapping ( address => Token ) _tokens;
    mapping ( uint => Artifact ) _artifacts;

    struct Artifact {
        string name; // Just for visual representation. Should not be in the final script.
        mapping (address => bool) validTokens; // disabled for testing reasons. See "isArtifactValid" function
    }

    struct Token {
        mapping ( address => address ) openRequests;
        address[] sponsors;
        mapping (address => Wallet) wallets;
    }

    struct Wallet {
        uint balance;
        address[] validators;
    }

    function Salv() public {
        _artifacts[42] = Artifact({name: "Rubber Duck"});
        _artifacts[101] = Artifact({name: "Swimming Ticket"});
    }

    function addArtifactToken(address token, uint artifact) public requiresSponsor(token, msg.sender) requiresInvalidArtifact(token, artifact) {
        _artifacts[artifact].validTokens[token] = true;
    }

    function addSponsor(address token, address newSponsor) public requiresOwner requiresNotSponsor(token, newSponsor) {
        _tokens[token].sponsors.push(newSponsor);
    }

    function exchange(address token, address supplier) public requiresSponsor(token, msg.sender) {
        uint amount = _tokens[token].wallets[supplier].balance;
        _tokens[token].wallets[supplier].balance = 0;
        TokenExchanged(supplier, msg.sender, token, amount);
    }

    function getAccountValidators(address token, address account) public view returns (address[] validators) {
        return _tokens[token].wallets[account].validators;
    }

    function getBalance(address token, address account) public view returns (uint balance) {
        return (_tokens[token].wallets[account].balance);
    }

    function getSponsorOfOpenRequest(address token, address applicant) public view returns (address sponsor) {
        return _tokens[token].openRequests[applicant];
    }

    function getSponsors(address token) public view returns (address[] sponsors) {
        return _tokens[token].sponsors;
    }

    function grantFund(address token, address applicant) private requiresValidated(token, applicant) {
        uint newBalance = (_tokens[token].wallets[applicant].balance += 300);
        address sponsor = _tokens[token].openRequests[applicant];
        _tokens[token].openRequests[applicant] = 0;
        FundGranted(applicant, sponsor, token, newBalance);
    }

    function hasOpenRequest(address token, address applicant) public view returns (bool) {
        return _tokens[token].openRequests[applicant] != 0;
    }

    function isAccountValidated(address token, address account) public view returns (bool isValidated) {
        return getAccountValidators(token, account).length > 0;
    }

    function isAccountValidatedBy(address validator, address token, address account) private view returns (bool isValidated) {
        address[] memory validators = getAccountValidators(account, token);
        for (uint i = 0; i < validators.length; i++) {
            if (validators[i] == validator) {
                return true;
            }
        }
        return false;
    }

    function isArtifactValid(address token, uint artifact) public view returns (bool) {
        return token > 0 && artifact > 0;
        // Disabled for testing purposes 
        //return (_artifacts[artifact].validTokens[token] != true);
    }

    function isSponsor(address token, address account) private view returns (bool) {
        address[] memory sponsors = _tokens[token].sponsors;
        for (uint i = 0; i < sponsors.length; i++) {
            if (account == sponsors[i]) {
                return true;
            }
        }
        return false;
    }

    function removeArtifactToken(address token, uint artifact) public requiresSponsor(token, msg.sender) requiresValidArtifact(token, artifact) {
        _artifacts[artifact].validTokens[token] = false;
    }

    function removeSponsor(address token, address sponsor) public requiresOwner requiresSponsor(token, sponsor) {
        address[] memory sponsors = _tokens[token].sponsors;
        for (uint i = 0; i < sponsors.length; i++) {
            delete _tokens[token].sponsors[i];
            return;
        }
    }

    function requestFund(address token, address sponsor) public requiresNoOpenRequest(token, msg.sender) requiresSponsor(token, sponsor) {
        _tokens[token].openRequests[msg.sender] = sponsor;
        FundRequested(msg.sender, sponsor, token);
        if (isAccountValidated(token, msg.sender)) {
            // grant fund
            grantFund(token, msg.sender);
        } else {
            // add to queue, waiting to be validated
            FundQueued(msg.sender, sponsor, token);
        }
    }

    function spend(address token, uint amount, address supplier, uint artifact) public requiresBalanceOf(token, amount, msg.sender) requiresValidArtifact(token, artifact) {
        _tokens[token].wallets[msg.sender].balance -= amount;
        _tokens[token].wallets[supplier].balance += amount;
        uint balance = _tokens[token].wallets[msg.sender].balance;
        TokenSpent(msg.sender, token, supplier, amount, _artifacts[artifact].name, balance);
    } 

    function validateAccount(address account, address token) public requiresNotValidatedBy(msg.sender, token, account) {
        _tokens[token].wallets[account].validators.push(msg.sender);
        IdentityValidated(account, msg.sender);
        if (hasOpenRequest(token, account)) {
            grantFund(token, account);
        }
    }
}