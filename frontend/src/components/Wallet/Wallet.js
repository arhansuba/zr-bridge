import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Wallet.css';

const Wallet = ({ provider }) => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const [network, setNetwork] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getAccountDetails = async () => {
            if (!provider) return;

            try {
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    const account = accounts[0];
                    setAccount(account);
                    const balance = await provider.getBalance(account);
                    setBalance(ethers.utils.formatEther(balance));
                    const network = await provider.getNetwork();
                    setNetwork(network.name);
                    // Fetch token balances and transactions here
                    await fetchTokenBalances(account);
                    await fetchTransactionHistory(account);
                }
            } catch (err) {
                setError('Error fetching account details');
            }
        };

        getAccountDetails();
    }, [provider]);

    const handleConnect = async () => {
        if (!provider) return;

        try {
            const accounts = await provider.send('eth_requestAccounts', []);
            if (accounts.length > 0) {
                const account = accounts[0];
                setAccount(account);
                const balance = await provider.getBalance(account);
                setBalance(ethers.utils.formatEther(balance));
                const network = await provider.getNetwork();
                setNetwork(network.name);
                // Fetch token balances and transactions here
                await fetchTokenBalances(account);
                await fetchTransactionHistory(account);
            }
        } catch (err) {
            setError('Error connecting to wallet');
        }
    };

    const fetchTokenBalances = async (account) => {
        // Replace with actual token contract instances and ABI
        // Example for fetching token balances:
        try {
            // Placeholder for token balances
            const tokenBalances = []; // Fetch token balances from contracts
            setTokens(tokenBalances);
        } catch (err) {
            setError('Error fetching token balances');
        }
    };

    const fetchTransactionHistory = async (account) => {
        // Replace with actual transaction fetching logic
        try {
            const transactions = []; // Fetch transactions from blockchain
            setTransactions(transactions);
        } catch (err) {
            setError('Error fetching transaction history');
        }
    };

    return (
        <div className="wallet-container">
            <h2>Wallet</h2>
            {!account ? (
                <button className="connect-button" onClick={handleConnect}>
                    Connect Wallet
                </button>
            ) : (
                <div className="wallet-info">
                    <p><strong>Address:</strong> {account}</p>
                    <p><strong>Balance:</strong> {balance} ETH</p>
                    <p><strong>Network:</strong> {network}</p>
                    <div className="tokens-section">
                        <h3>Token Balances</h3>
                        {tokens.length > 0 ? (
                            <ul>
                                {tokens.map((token, index) => (
                                    <li key={index}>
                                        {token.name}: {token.balance} {token.symbol}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tokens found</p>
                        )}
                    </div>
                    <div className="transactions-section">
                        <h3>Transaction History</h3>
                        {transactions.length > 0 ? (
                            <ul>
                                {transactions.map((tx, index) => (
                                    <li key={index}>
                                        <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                                            {tx.date}: {tx.amount} ETH
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No transactions found</p>
                        )}
                    </div>
                </div>
            )}
            {error && <div className="alert error">{error}</div>}
        </div>
    );
}

export default Wallet;
