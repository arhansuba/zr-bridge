// scripts/interact.js

const hre = require("hardhat");
const fs = require('fs');

// Load the deployed contract addresses
const addresses = JSON.parse(fs.readFileSync('deployed-addresses.json', 'utf8'));

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Interacting with contracts using account:", deployer.address);

    const TokenLocker = await hre.ethers.getContractFactory("TokenLocker");
    const tokenLocker = TokenLocker.attach(addresses.TokenLocker);

    const TokenMinter = await hre.ethers.getContractFactory("TokenMinter");
    const tokenMinter = TokenMinter.attach(addresses.TokenMinter);

    const ZrSignBridge = await hre.ethers.getContractFactory("ZrSignBridge");
    const zrSignBridge = ZrSignBridge.attach(addresses.ZrSignBridge);

    // Example interaction
    console.log("Locking tokens on the source chain...");
    const lockTx = await tokenLocker.lockTokens(100, "TargetChain");
    await lockTx.wait();
    console.log("Tokens locked.");

    console.log("Minting tokens on the target chain...");
    const mintTx = await zrSignBridge.verifyAndMint(deployer.address, 100, "0x...");
    await mintTx.wait();
    console.log("Tokens minted.");

    // You can also interact with other methods as needed
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
