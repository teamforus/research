// Change filename to "truffle.js" on non-Windows platforms

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      //from: '0x174c9b9ff0d93737132eb194430b56dc5ff5f3b2', // TESTRPC  
      from: '0xb647b9999a23c044bCC047BE3D2A44301F567340', // GETH
      gas: 4712388 
    }
  }
};