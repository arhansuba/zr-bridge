import { ethers } from 'ethers';

// Function to get a contract instance
export const getContractInstance = (provider, contractAddress, abi) => {
    return new ethers.Contract(contractAddress, abi, provider);
};

// Function to send a transaction to a contract
export const sendTransaction = async (provider, contractAddress, abi, methodName, params, signer) => {
    try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract[methodName](...params);
        await tx.wait(); // Wait for transaction to be mined
        return tx;
    } catch (error) {
        console.error('Transaction error:', error);
        throw new Error('Transaction failed');
    }
};

// Function to call a read-only method from a contract
export const callContractMethod = async (provider, contractAddress, abi, methodName, params = []) => {
    try {
        const contract = getContractInstance(provider, contractAddress, abi);
        const result = await contract[methodName](...params);
        return result;
    } catch (error) {
        console.error('Contract call error:', error);
        throw new Error('Contract call failed');
    }
};

// Function to get the balance of a specific token
export const getTokenBalance = async (provider, tokenAddress, account) => {
    try {
        const abi = [
            "function balanceOf(address account) view returns (uint256)"
        ];
        const contract = getContractInstance(provider, tokenAddress, abi);
        const balance = await contract.balanceOf(account);
        return ethers.utils.formatUnits(balance, 18); // Assuming token has 18 decimals
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw new Error('Failed to fetch token balance');
    }
};

// Function to get transaction details by hash
export const getTransactionDetails = async (provider, txHash) => {
    try {
        const tx = await provider.getTransaction(txHash);
        return tx;
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw new Error('Failed to fetch transaction details');
    }
};
