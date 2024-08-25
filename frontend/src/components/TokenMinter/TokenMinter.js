import React, { useState } from 'react';
import { ethers } from 'ethers';
import './TokenMinter.css';
import tokenMinterAbi from '../contracts/TokenMinter.json'; // Import the ABI for TokenMinter contract

const TokenMinter = ({ contractAddress, provider }) => {
    const [mintAmount, setMintAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Create contract instance
    const tokenMinterContract = new ethers.Contract(contractAddress, tokenMinterAbi, provider.getSigner());

    // Function to mint tokens
    const mintTokens = async () => {
        try {
            if (!mintAmount || isNaN(mintAmount) || parseFloat(mintAmount) <= 0) {
                setErrorMessage('Please enter a valid amount to mint.');
                return;
            }

            const tx = await tokenMinterContract.mintTokens(ethers.utils.parseUnits(mintAmount, 18));
            await tx.wait();
            setSuccessMessage(`Successfully minted ${mintAmount} tokens.`);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Transaction failed. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="token-minter-container">
            <h2>Token Minter</h2>
            <div className="input-group">
                <label htmlFor="amount">Amount to Mint</label>
                <input
                    type="number"
                    id="amount"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <button className="mint-button" onClick={mintTokens}>
                Mint Tokens
            </button>

            {successMessage && <div className="alert success">{successMessage}</div>}
            {errorMessage && <div className="alert error">{errorMessage}</div>}
        </div>
    );
};

export default TokenMinter;
