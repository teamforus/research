// Change filename to "truffle.js" on non-Windows platforms

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      //from: '0x7c5a2ef2e2f25bf9ca10cb5159fe7537c120defe',
      from: '0xb647b9999a23c044bCC047BE3D2A44301F567340',
      gas: 4712388 
    }
  }
};