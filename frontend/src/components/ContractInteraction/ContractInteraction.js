import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getContractInstance, sendTransaction, callContractMethod, getTokenBalance, getTransactionDetails } from './contractHelpers';
import './ContractInteractions.css'; // Import CSS file

const ContractInteractions = () => {
    const [provider, setProvider] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(null);
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        // Initialize provider
        const initProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(initProvider);
    }, []);

    const fetchTokenBalance = async (tokenAddress, account) => {
        try {
            const balance = await getTokenBalance(provider, tokenAddress, account);
            setTokenBalance(balance);
        } catch (error) {
            console.error('Failed to fetch token balance:', error);
        }
    };

    const executeTransaction = async () => {
        try {
            const contractAddress = '0xYourContractAddress';
            const abi = [ /* Contract ABI */ ];
            const methodName = 'yourMethodName';
            const params = [ /* Method parameters */ ];
            const signer = provider.getSigner();

            const tx = await sendTransaction(provider, contractAddress, abi, methodName, params, signer);
            console.log('Transaction sent:', tx);
        } catch (error) {
            console.error('Transaction error:', error);
        }
    };

    const fetchTransactionDetails = async (txHash) => {
        try {
            const tx = await getTransactionDetails(provider, txHash);
            setTransaction(tx);
        } catch (error) {
            console.error('Failed to fetch transaction details:', error);
        }
    };

    return (
        <div className="contract-interactions">
            <h2>Contract Interactions</h2>
            <div className="button-group">
                <button onClick={() => fetchTokenBalance('0xTokenAddress', '0xYourAccount')}>Get Token Balance</button>
                <button onClick={executeTransaction}>Execute Transaction</button>
                <button onClick={() => fetchTransactionDetails('0xTransactionHash')}>Get Transaction Details</button>
            </div>
            {tokenBalance && <p className="result">Token Balance: {tokenBalance}</p>}
            {transaction && <p className="result">Transaction Details: {JSON.stringify(transaction)}</p>}
        </div>
    );
};

export default ContractInteractions;
