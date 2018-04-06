pragma solidity ^0.4.2;

// attach and verify email address

contract Forus {
	function helloWorld() constant returns(string) {
		return "Hello World!";
	}

	mapping (address => User) users;

	int totalSponsorships;
	mapping (int => Sponsorship) sponsorshipForID;
	
	enum GrantStatus {Pending, Approved, Declined, Spent}

	struct User {
	    address userAddress;
		
		mapping (string => string) properties;
		mapping (string => mapping (string => address[])) propertySignatures;
        
        int[] activeSponsorshipIDs;
        mapping (int => Sponsorship) sponsorships;
        
        ValidationRequest[] openValidationRequests;
		mapping (int => Grant) grants;
	}
	
	struct Sponsorship {
		address creator;
	    int identifier;
	    int quantity;
	    int totalSum;
	    int criteriaAmount;
	    string[] criteriaKeys;
	    mapping (address => bool) sponsors;
	    mapping (string => string) properties;
	    mapping (string => string) criteria; // should add validators
	}
	
	struct Grant {
        GrantStatus status;
    
        address sponsor; 
        address reciever;
        address provider;
    	
    	uint maxValue;
    	uint spentValue;
	}
	
	struct ValidationRequest {
	    address user;
	    address validator;
	    string key;
	    string value;
	}
	
	// MARK: - USER
	function createUser() returns(bool) {
	    if (users[msg.sender].userAddress == 0) {
	        users[msg.sender].userAddress = msg.sender;
	        return false;
	    } else {
	        return true;
	    }
	}

	function checkUserExistence() constant returns(bool) {
	    if (users[msg.sender].userAddress == 0) {
	        return false;
	    } else {
	        return true;
	    }
	}

	function findUser(address id) constant returns(address) {
	    return users[id].userAddress;
	}

	function setUserProperty(string key, string value) {
	    users[msg.sender].properties[key] = value;
	   // users[msg.sender].propertySignatures[key][value].push(msg.sender); // sign property by owner
	}
	
// 	function signUserProperty(address user, string key, string value) {
//         // users[user].propertySignatures[key][value].push(msg.sender);
// 	}
	
// 	function checkPropertySignature(string key, string value, address user, address signer) constant returns(bool) {
//         // if (users[user].propertySignatures[key][value].contains(signer)) {
            
//         // }
// 	}
	
	function getUserProperty(string key) constant returns(string) {
	    return users[msg.sender].properties[key];
	}
	
// 	function deleteUserProperty() { // key / value
// 	    // check msg.sender
// 	    // key / value
// 	}
	
	// MARK: - SPONSORSHIP
	function newSponsorship(string name, int quantity, int sum) returns(int) {
	    // todo: check for user payment details
	    ++totalSponsorships;
	    
	    var ID = totalSponsorships;
	    
	    var user = users[msg.sender];
	    user.activeSponsorshipIDs.push(ID);

	    var sponsorship = user.sponsorships[ID];
	    sponsorship.creator = msg.sender;
	    sponsorship.identifier = ID;
	    sponsorship.quantity = quantity;
	    sponsorship.totalSum = sum;
        sponsorshipForID[ID] = sponsorship;
	    
	    // workaround for mapping issue
	    sponsorshipForID[ID].properties["stringID"] = name; 
	    
	    return ID;
	}
	
	function updateSponsorshipCriteria(int id, string key, string value) {
	    users[msg.sender].sponsorships[id].criteria[key] = value;
	}
	
	function getSponsorshipCriteriaAmount(int ID) constant returns(int) {
	    return sponsorshipForID[ID].criteriaAmount;
	}
	
	function getSponsorshipCriteria(int ID, uint criteria) constant returns (string, string) {
	    var key = sponsorshipForID[ID].criteriaKeys[criteria];
	    return (key, sponsorshipForID[ID].criteria[key]);
	}

	function getSponsorshipAmount() constant returns(int) {
		return totalSponsorships;
	}
	
	function getSponsorshipStatusAndCreator(int id) constant returns(int, int, address, string) {
		var sponsorship = sponsorshipForID[id];
        var sum = sponsorship.totalSum;
        var quantity = sponsorship.quantity;
        var creator = sponsorship.creator;
        
        return (sum, quantity, creator, sponsorship.properties["stringID"]);
	}
	
	// MARK: - GRANTREQUEST
	// function createGrantRequest()
	// 
	
}