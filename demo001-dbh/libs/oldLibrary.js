// var library = {};
//
// fs.readFile('../data/donatorCenteredContract.sol', 'utf8', function (err, contractSource) {
//
//     library.createSupplierAccount = function (name, kvkNr, phone, fax, email, website, address, category) {
//         var contract = web3Helper.compile(contractSource, 'Supplier');
//         var contract_bytecode = contract.bytecode;
//         var contract_interface = contract.interface;
//
//         // TODO: Add Iban to UI and then here
//         var supplierContract = web3.eth.contract(contract_interface);
//         supplierContract.new(
//             name,
//             kvkNr,
//             phone, //iban
//             fax,
//             email,
//             website,
//             address,
//             category,
//             {
//                 from: wallet.testnet,
//                 data: contract_bytecode,
//                 gas: web3Helper.estimateGasPrice(contract_bytecode)
//             },
//             function (e, contract) {
//                 console.log(e, contract);
//                 if (contract != undefined && contract.address != undefined) {
//                     bhAddresses.suppliers.push(contract);
//                     console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//                 }
//             });
//     };
//
//     library.createDonation = function (productName, category, quantity, iban, source, maxValuePerItem) {
//         var contract = web3Helper.compile(contractSource, 'Donation');
//         var contract_bytecode = contract.bytecode;
//         var contract_interface = contract.interface;
//
//         var donationContract = web3.eth.contract(contract_interface);
//
//         donationContract.new(
//             productName,
//             category,
//             quantity,
//             iban,
//             source,
//             maxValuePerItem,
//             {
//                 from: wallet.testnet,
//                 data: contract_bytecode,
//                 gas: web3Helper.estimateGasPrice(contract_bytecode)
//             },
//             function (e, contract) {
//                 console.log(e, contract);
//                 if (contract != undefined && contract.address != undefined) {
//                     bhAddresses.donations.push(contract);
//                     console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//                 }
//             });
//     };
//
//     library.searchForDonation = function (searchName) {
//         return bhAddresses.donations.filter(function (element) {
//             return element.productName.indexOf(searchName) !== -1;
//         });
//     };
//
//     library.applyForDonation = function (donationAddress, receiverAddress) {
//         var contract = web3Helper.compile(contractSource, 'DonationRequest');
//         var contract_bytecode = contract.bytecode;
//         var contract_interface = contract.interface;
//
//         var authorizationCode = Math.random().toString(36).substring(7);
//
//         var newDonationRequest = web3.eth.contract(contract_interface);
//         newDonationRequest.new(
//             donationAddress,
//             receiverAddress,
//             true,
//             0,
//             authorizationCode,
//             {
//                 from: wallet.testnet,
//                 data: contract_bytecode,
//                 gas: web3Helper.estimateGasPrice(contract_bytecode)
//             },
//             function (e, contract) {
//                 if (contract != undefined && contract.address != undefined) {
//                     bhAddresses.donationRequests.push(contract);
//                     console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//                 }
//             });
//     };
//
//     library.getDonationRequestByAuthorizationCode = function (authorizationCode) {
//         var donationRequest = bhAddresses.donationRequests.filter(function (element) {
//             return element.authorizationCode == authorizationCode;
//         });
//
//         return aggregateDonationRequestInfo(donationRequest);
//     };
//
//     library.getDonationRequestByAddress = function (donationRequestAddress) {
//         var donationRequest = bhAddresses.donationRequests.filter(function (element) {
//             return element.address == donationRequestAddress;
//         });
//
//         return aggregateDonationRequestInfo(donationRequest);
//     };
//
//     function aggregateDonationRequestInfo(donationRequest) {
//         var relatedDonation = bhAddresses.donations.filter(function (element) {
//             return element.address == donationRequest.donationAddress;
//         });
//
//         var receiver = bhAddresses.receivers.filter(function (element) {
//             return element.address == donationRequest.receiverAddress;
//         });
//
//         return {
//             source: relatedDonation.source,
//             productName: relatedDonation.productName,
//             maxValuePerItem: relatedDonation.maxValuePerItem,
//             category: relatedDonation.category,
//             status: donationRequest.status,
//             authorizationCode: donationRequest.authorizationCode,
//             receiverName: receiver.name,
//             receiverSurname: receiver.surname,
//             receiverBsn: receiver.bsn
//         };
//     }
//
//     library.createReceiver = function (name, surname, bsn) {
//         var contract = web3Helper.compile(contractSource, 'Receiver');
//         var contract_bytecode = contract.bytecode;
//         var contract_interface = contract.interface;
//
//         var receiverContract = web3.eth.contract(contract_interface);
//         receiverContract.new(
//             name,
//             surname,
//             bsn,
//             {
//                 from: wallet.testnet,
//                 data: contract_bytecode,
//                 gas: web3Helper.estimateGasPrice(contract_bytecode)
//             }, function (e, contract) {
//                 if (contract != undefined && contract.address != undefined) {
//                     bhAddresses.receivers.push(contract);
//                     console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//                 }
//             });
//     };
//
//     library.setDonationRequestFulfilled = function (donationRequestAddress, productSerialNumber, invoiceNr, sellingPrice) {
//         var donationRequest = bhAddresses.donationRequests.filter(function (element) {
//             return element.address == donationRequestAddress;
//         });
//
//         // TODO Update in Blockchain
//         donationRequest.setFulfilled(productSerialNumber, invoiceNr, sellingPrice);
//     };
// });