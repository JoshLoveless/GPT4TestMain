const hre = require("hardhat");

const fs = require("fs");

if (!fs.existsSync("./secrets.json")) {
   throw new Error("secrets.json file not found. Please create one with your privateKey and infuraApiKey.");
}

const { privateKey, infuraApiKey } = require("../secrets.json");

if (!privateKey || !infuraApiKey) {
   throw new Error("secrets.json must include both privateKey and infuraApiKey.");
}


async function main() {
   const [deployer] = await hre.ethers.getSigners();

   console.log("Deploying contracts with the account:", deployer.address);

   const LoveToken = "0x8E3cf52ff2aa569a131a6eaF76B9b0544ccaaf32";
   const Collection1 = "0x968Ca1969125f2E2e22A699a6712bc77d38A18f1"; // Replace with the actual contract address
   const Collection2 = "0x25ed80cCF0E51025dddEA348a53Cd06213002218"; // Replace with the actual contract address
   const Collection3 = "0xd05eb63550D140A1b6f1f455427372791590d4d8"; // Replace with the actual contract address
   const Collection4 = "0x94E0619848D0991F9e8FB7A2c4f6d818a32d44e4"; // Replace with the actual contract address
   const initialRewardAmount = hre.ethers.utils.parseUnits("100", 18);

   const NFTBurner = await hre.ethers.getContractFactory("NFTBurner");
   const nftBurner = await NFTBurner.deploy(LoveToken, Collection1, Collection2, Collection3, Collection4, initialRewardAmount);

   await nftBurner.deployed();

   console.log("NFTBurner deployed to:", nftBurner.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
