require("@nomiclabs/hardhat-ethers");

const { privateKey, infuraApiKey } = require("./secrets.json");

module.exports = {
   solidity: "0.8.18",
   networks: {
      goerli: {
         url: `https://goerli.infura.io/v3/${infuraApiKey}`,
         accounts: [privateKey],
      },
   },
};
