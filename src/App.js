import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sendPayment","outputs":[],"stateMutability":"payable","type":"function"}];
const CONTRACT_ADDRESS =  '0xB5364e95BAC807F262744Dedd87BBF5b70504855';

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
    if (!web3 || !accounts || accounts.length === 0) {
      alert('Please connect MetaMask to this dApp.');
      return;
    }

    try {
      await contract.methods.sendPayment(message).send({
        from: accounts[0],
        value: web3.utils.toWei('0.2', 'ether'),
      });

      // Add this code
      const response = await fetch('http://localhost:4000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: mobileNumber,
          text: 'A text message sent using the Vonage SMS API'
        })
      });

      const data = await response.json();
      console.log(data.message); // logs 'Message sent successfully'

      setMessage(''); // Reset message after sending
      setMobileNumber(''); // Reset mobile number after sending

      const recipients = await contract.methods.getUsers().call();
      setRecipients(recipients);
    } catch (error) {
      console.error('Error sending payment:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/tdilog.png" alt="Header" className="App-logo" />
        <h1>Payment dApp</h1>
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
      </header>
    </div>
  );
}

export default App;
