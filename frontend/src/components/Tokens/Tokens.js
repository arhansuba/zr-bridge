import React from 'react';
import tokenList from '../../tokenList.json';
import './Tokens.css'; // Make sure this is the correct path

const Tokens = () => {
  return (
    <div className="tokens-container">
      <h2 className="tokens-title">Available Tokens</h2>
      <div className="tokens-list">
        {tokenList.map((token, index) => (
          <div className="token-card" key={index}>
            <img src={token.img} alt={token.name} className="token-image" />
            <div className="token-info">
              <h3 className="token-name">{token.name}</h3>
              <p className="token-ticker">{token.ticker}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tokens;
