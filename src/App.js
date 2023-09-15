import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Function to handle SMS using Nexmo API
  const sendSMS = async (number, message, walletAddress, transactionId) => {
    const API_KEY = '473d3aba';
    const API_SECRET = 'ZIu8VnYsav99tSew';
    const URL = 'https://rest.nexmo.com/sms/json';

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `from=${walletAddress}&id=${transactionId}&text=${message}&to=${number}&api_key=${API_KEY}&api_secret=${API_SECRET}`
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Offchain SMS</h1>
      </header>
      <div className="main-content">
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
        <div className="inputnumber-container">
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
        <div className="input-container">
          <label>
            Wallet Address:
            <input
              type="text"
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              placeholder="Enter your wallet address"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Transaction ID:
            <input
              type="text"
              value={transactionId}
              onChange={e => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
            />
          </label>
        </div>
        <div className="button-container">
          <button onClick={() => sendSMS(mobileNumber, message, walletAddress, transactionId)}>Send SMS</button>
        </div>
      </div>
    </div>
  );
}

export default App;
