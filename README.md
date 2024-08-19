# zr-bridge
# zr-bridge

`zr-bridge` is a cross-chain token bridge implementation using the `zrSign` protocol for secure transaction signing and verification. This project allows seamless token transfers between different blockchains by utilizing smart contracts for token locking, minting, and signing.

## Table of Contents

1. [Overview](#overview)
2. [Contracts](#contracts)
   - [TokenLocker](#tokenlocker)
   - [TokenMinter](#tokenminter)
   - [ZrSignBridge](#zrsignbridge)
3. [Setup and Deployment](#setup-and-deployment)
4. [Usage](#usage)
5. [Integration with zrSign](#integration-with-zrsign)
6. [Contributing](#contributing)
7. [License](#license)

## Overview

The `zr-bridge` project facilitates the transfer of tokens between two blockchains by implementing a token bridge using `zrSign`. The bridge includes:

- **Token Locker**: A contract on the source blockchain that locks tokens and emits an event.
- **Token Minter**: A contract on the target blockchain that mints tokens based on the events from the source blockchain.
- **ZrSign Bridge**: Integrates with `zrSign` to securely sign and verify transactions between the two blockchains.

## Contracts

### TokenLocker

**Path:** `contracts/bridge/TokenLocker.sol`

The `TokenLocker` contract locks tokens on the source blockchain and emits an event to indicate that tokens are ready to be minted on the target chain.

#### Key Functions:
- `lockTokens(uint256 amount, string memory targetChain)`: Locks the specified amount of tokens and emits a `TokensLocked` event.
- `unlockTokens(uint256 amount)`: Unlocks the specified amount of tokens for the user.

### TokenMinter

**Path:** `contracts/bridge/TokenMinter.sol`

The `TokenMinter` contract mints tokens on the target blockchain based on the information provided by the source blockchain.

#### Key Functions:
- `mintTokens(address user, uint256 amount)`: Mints tokens for the specified user.

### ZrSignBridge

**Path:** `contracts/bridge/ZrSignBridge.sol`

The `ZrSignBridge` contract integrates `zrSign` for signing and verifying transactions between blockchains. It handles the secure transfer of tokens by verifying signatures and interacting with `TokenLocker` and `TokenMinter`.

#### Key Functions:
- `signLockingTransaction(address user, uint256 amount, string memory targetChain)`: Signs a locking transaction using `zrSign` and returns the signed hash.
- `verifyAndMint(address user, uint256 amount, bytes32 signedData)`: Verifies the signed data and mints tokens on the target chain if valid.

## Setup and Deployment

1. **Clone the Repository**

  
   git clone https://github.com/arhansuba/zr-bridge.git
   cd zr-bridge
Install Dependencies

Ensure you have Node.js and npm installed. Then, run:


npm install
Compile the Contracts

Use Hardhat to compile the smart contracts:


npx hardhat compile
Deploy Contracts

Update the deployment scripts in scripts/deploy.js with the correct contract parameters, then deploy:


npx hardhat run scripts/deploy.js --network <network>
Usage
Lock Tokens

Call lockTokens on the TokenLocker contract to lock tokens on the source blockchain.
Mint Tokens

Use the ZrSignBridge contract to sign the locking transaction.
Call verifyAndMint on the ZrSignBridge contract on the target blockchain to mint tokens.
Integration with zrSign
Signing Transactions

The ZrSignBridge contract uses the zrSign protocol to sign transactions. Ensure that the IZRSign interface is correctly implemented and deployed.

Verification

The contract verifies the signed data to ensure transaction integrity before minting tokens.

Contributing
We welcome contributions to the zr-bridge project! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
Please make sure your code adheres to our coding standards and includes appropriate tests.

License
This project is licensed under the MIT License - see the LICENSE file for details.
