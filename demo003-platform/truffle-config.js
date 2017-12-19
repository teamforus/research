// Change filename to "truffle.js" on non-Windows platforms

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      //from: '0x174c9b9ff0d93737132eb194430b56dc5ff5f3b2', // TESTRPC  
      from: '0x6987f79ed5180Cc2B72B2137A555D9eB18e67780', // GETH
      gas: 4712388 
    }
  }
};