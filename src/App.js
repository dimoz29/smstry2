import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

// ... (rest of the code)

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(''); // New state for message
  const [mobileNumber, setMobileNumber] = useState(''); // New state for mobile number

  useEffect(() => {
    initializeWeb3();
  }, []);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to interact with this dApp.');
    }
  };

  const sendPayment = async () => {
    // ... (rest of the code)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img
            src="/tdilog.png" // Replace with your logo image path
            alt="Header"
            className="App-logo"
          />
        </div>
        <div className="eth-logo-container">
          <a href="https://sepolia.etherscan.io/address/0xb5364e95bac807f262744dedd87bbf5b70504855" target="_blank" rel="noopener noreferrer">
            <img
              src="/ethereum-logo.png" // Replace with your Ethereum logo image path
              alt="Ethereum"
              className="eth-logo"
            />
          </a>
        </div>
      </header>

      <div className="main-content">
        <h1>BlockChain Guild WEB3SMS </h1>
        {accounts.length === 0 ? (
          <button onClick={initializeWeb3}>Connect Wallet</button>
        ) : (
          <>
            <div className="input-container">
              <label>
                Enter message:
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter your message here"
                />
              </label>
            </div>
            <div>
              <label>
                Enter mobile number:
                <input
                  type="text" 
                  value={mobileNumber} 
                  onChange={e => setMobileNumber(e.target.value)} 
                  placeholder="Enter your mobile number here"
                />
              </label>
            </div>
            <div className="button-container">
              <button onClick={sendPayment}>Send Payment</button>
            </div>
            {recipients.length > 0 && (
              <div className="recipient-list">
                <h2>Recipients:</h2>
                {recipients.map((recipient, index) => (
                  <div key={index} className="recipient-card">
                    <p>{recipient}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
