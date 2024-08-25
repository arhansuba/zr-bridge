import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useConnect, useAccount } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Web3Provider } from './context/Web3Context';

import Header from './components/Header/Header';
import Swap from './components/Swap/Swap';
import Tokens from './components/Tokens/Tokens';
import Bridge from './components/Bridge/Bridge';
import TokenLocker from './components/TokenLocker/TokenLocker';
import TokenMinter from './components/TokenMinter/TokenMinter';
import Wallet from './components/Wallet/Wallet';

import './App.css';

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (
    <Web3Provider>
      <div className="App">
        <Header connect={connect} isConnected={isConnected} address={address} />
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Swap isConnected={isConnected} address={address} />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/token-locker" element={<TokenLocker />} />
            <Route path="/token-minter" element={<TokenMinter />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </div>
      </div>
    </Web3Provider>
  );
}

export default App;
