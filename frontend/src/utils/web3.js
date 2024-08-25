import { ethers } from 'ethers';

// Initialize the Ethereum provider
export const getProvider = () => {
    if (window.ethereum) {
        // Modern DApp browsers
        return new ethers.providers.Web3Provider(window.ethereum);
    } else if (window.web3) {
        // Legacy DApp browsers
        return new ethers.providers.Web3Provider(window.web3.currentProvider);
    } else {
        console.error('No Ethereum provider detected');
        return null;
    }
};

// Request user account access
export const requestAccount = async () => {
    const provider = getProvider();
    if (provider) {
        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            return accounts[0];
        } catch (error) {
            console.error('User denied account access:', error);
            throw new Error('User denied account access');
        }
    } else {
        throw new Error('Ethereum provider not found');
    }
};

// Get the network information
export const getNetwork = async () => {
    const provider = getProvider();
    if (provider) {
        try {
            const network = await provider.getNetwork();
            return network;
        } catch (error) {
            console.error('Failed to get network information:', error);
            throw new Error('Failed to get network information');
        }
    } else {
        throw new Error('Ethereum provider not found');
    }
};

// Get the signer for transactions
export const getSigner = async () => {
    const provider = getProvider();
    if (provider) {
        try {
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error('Failed to get signer:', error);
            throw new Error('Failed to get signer');
        }
    } else {
        throw new Error('Ethereum provider not found');
    }
};

// Convert Ether to Wei
export const toWei = (amount) => {
    return ethers.utils.parseEther(amount);
};

// Convert Wei to Ether
export const fromWei = (amount) => {
    return ethers.utils.formatEther(amount);
};
