/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const TokenLocker = await hre.ethers.getContractFactory("TokenLocker");
    const TokenMinter = await hre.ethers.getContractFactory("TokenMinter");
    const ZrSignBridge = await hre.ethers.getContractFactory("ZrSignBridge");

    // Deploy TokenLocker contract
    console.log("Deploying TokenLocker...");
    const tokenLocker = await TokenLocker.deploy();
    await tokenLocker.deployed();
    console.log("TokenLocker deployed to:", tokenLocker.address);

    // Deploy TokenMinter contract
    console.log("Deploying TokenMinter...");
    const tokenMinter = await TokenMinter.deploy();
    await tokenMinter.deployed();
    console.log("TokenMinter deployed to:", tokenMinter.address);

    // Deploy ZrSignBridge contract
    console.log("Deploying ZrSignBridge...");
    const zrSignBridge = await ZrSignBridge.deploy();
    await zrSignBridge.deployed();
    console.log("ZrSignBridge deployed to:", zrSignBridge.address);

    // Optionally, you can save the deployed contract addresses to a file
    const fs = require('fs');
    const addresses = {
        TokenLocker: tokenLocker.address,
        TokenMinter: tokenMinter.address,
        ZrSignBridge: zrSignBridge.address,
    };
    fs.writeFileSync('deployed-addresses.json', JSON.stringify(addresses, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

