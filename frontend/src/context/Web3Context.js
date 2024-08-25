import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => {
    return useContext(Web3Context);
};

// Provider component
export const Web3Provider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initialize Web3 provider
        const initializeProvider = async () => {
            if (window.ethereum) {
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(ethersProvider);

                // Handle account and network changes
                window.ethereum.on('accountsChanged', (accounts) => {
                    setAccount(accounts[0]);
                });

                window.ethereum.on('chainChanged', async () => {
                    const network = await ethersProvider.getNetwork();
                    setNetwork(network.name);
                });

                // Request accounts
                const accounts = await ethersProvider.listAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }

                // Set network
                const network = await ethersProvider.getNetwork();
                setNetwork(network.name);
            } else {
                setError('Please install MetaMask or another Web3 wallet.');
            }
        };

        initializeProvider();

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
                window.ethereum.removeAllListeners('chainChanged');
            }
        };
    }, []);

    const connectWallet = async () => {
        if (!provider) return;
        try {
            const accounts = await provider.send('eth_requestAccounts', []);
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }
        } catch (err) {
            setError('Error connecting to wallet');
        }
    };

    const value = {
        provider,
        account,
        network,
        error,
        connectWallet,
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
};
