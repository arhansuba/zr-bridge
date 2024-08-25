import React, { useState, useContext } from 'react';
import './Bridge.css'; // Import your styles
import { Web3Context } from '../../context/Web3Context'; // Import Web3 context
import { bridgeTokens } from '../../utils/contractHelpers'; // Helper function to bridge tokens

const Bridge = () => {
    const { web3, account } = useContext(Web3Context); // Access web3 and account from context
    const [amount, setAmount] = useState('');
    const [token, setToken] = useState('');

    const handleBridge = async (e) => {
        e.preventDefault();
        if (!amount || !token) {
            alert('Please provide valid token and amount.');
            return;
        }

        try {
            await bridgeTokens(web3, account, token, amount); // Call helper function to bridge tokens
            alert('Tokens bridged successfully!');
        } catch (error) {
            console.error('Error bridging tokens:', error);
            alert('Failed to bridge tokens.');
        }
    };

    return (
        <div className="bridge-container">
            <h2>Bridge Tokens</h2>
            <form onSubmit={handleBridge}>
                <div className="form-group">
                    <label htmlFor="token">Token Address:</label>
                    <input
                        type="text"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter token address"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount to bridge"
                        required
                    />
                </div>
                <button type="submit" className="bridge-button">Bridge Tokens</button>
            </form>
        </div>
    );
};

export default Bridge;
