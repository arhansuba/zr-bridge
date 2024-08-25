import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './TokenLocker.css';
import tokenLockerAbi from '../contracts/TokenLocker.json'; // Import the ABI for TokenLocker contract

const TokenLocker = ({ contractAddress, userAddress, provider }) => {
    const [lockAmount, setLockAmount] = useState('');
    const [lockDuration, setLockDuration] = useState('');
    const [lockedBalance, setLockedBalance] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const tokenLockerContract = new ethers.Contract(contractAddress, tokenLockerAbi, provider.getSigner());

    useEffect(() => {
        fetchLockedBalance();
    }, [userAddress]);

    // Function to fetch locked token balance
    const fetchLockedBalance = async () => {
        try {
            const balance = await tokenLockerContract.getLockedBalance(userAddress);
            setLockedBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            setErrorMessage('Failed to fetch locked balance.');
        }
    };

    // Function to lock tokens
    const lockTokens = async () => {
        try {
            const tx = await tokenLockerContract.lockTokens(ethers.utils.parseEther(lockAmount), lockDuration);
            await tx.wait();
            setSuccessMessage(`Successfully locked ${lockAmount} tokens for ${lockDuration} seconds.`);
            setErrorMessage('');
            fetchLockedBalance();
        } catch (error) {
            setErrorMessage('Transaction failed. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="token-locker-container">
            <h2>Token Locker</h2>
            <div className="input-group">
                <label htmlFor="amount">Amount to Lock</label>
                <input
                    type="number"
                    id="amount"
                    value={lockAmount}
                    onChange={(e) => setLockAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <div className="input-group">
                <label htmlFor="duration">Lock Duration (in seconds)</label>
                <input
                    type="number"
                    id="duration"
                    value={lockDuration}
                    onChange={(e) => setLockDuration(e.target.value)}
                    placeholder="Enter duration"
                />
            </div>
            <button className="lock-button" onClick={lockTokens}>
                Lock Tokens
            </button>
            
            {successMessage && <div className="alert success">{successMessage}</div>}
            {errorMessage && <div className="alert error">{errorMessage}</div>}

            <div className="locked-info">
                <h3>Your Locked Balance</h3>
                <p>{lockedBalance} Tokens</p>
            </div>
        </div>
    );
};

export default TokenLocker;
