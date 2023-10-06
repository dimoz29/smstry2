import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Vonage from '@vonage/server-sdk'; // Import Vonage
import './App.css';

const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sendPayment","outputs":[],"stateMutability":"payable","type":"function"}];
const CONTRACT_ADDRESS = '0xB5364e95BAC807F262744Dedd87BBF5b70504855';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    initializeWeb3();
  }, []);

  // Initialize Vonage client with your API key and secret
  const vonage = new Vonage({
    apiKey: 'b78ec810', // Replace with your Vonage API key
    apiSecret: 'SkV66w8nnV1Wsi0v', // Replace with your Vonage API secret
  });

  const openPopup = () => {
    const recipientList = recipients.join('\n');
    const popupWindow = window.open('', '_blank', 'width=400,height=400');
    popupWindow.document.write('<pre>' + recipientList + '</pre>');
  };

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

  // Function to handle SMS using Vonage
  const sendSMS = async (number, message) => {
    try {
      const response = await vonage.message.sendSms(
        'YOUR_VONAGE_VIRTUAL_NUMBER', // Replace with your Vonage virtual number
        number,
        message
      );

      if (response.messages[0].status === '0') {
        console.log('SMS sent successfully:', response.messages[0]['message-id']);
      } else {
        console.error(`Error sending SMS: ${response.messages[0]['error-text']}`);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const sendPayment = async () => {
    if (!web3 || !accounts || accounts.length === 0) {
      alert('Please connect MetaMask to this dApp.');
      return;
    }

    try {
      await contract.methods.sendPayment().send({
        from: accounts[0],
        value: web3.utils.toWei('0.2', 'ether'),
      });

      // Send SMS
      await sendSMS(mobileNumber, message);

      setMessage('');
      setMobileNumber('');

      const recipients = await contract.methods.getUsers().call();
      setRecipients(recipients);
    } catch (error) {
      console.error('Error sending payment:', error);
    }
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
              <h1 className="blockchain-header">BlockChain Guild WEB3SMS</h1>
        <div className="eth-logo-container">
          <a href="https://sepolia.etherscan.io/address/0xb5364e95bac807f262744dedd87bbf5b70504855" target="_blank" rel="noopener noreferrer">
            <img
              src="/ethJstransparent.png" // Replace with your Ethereum logo image path
              alt="Ethereum"
              className="eth-logo"
            />
          </a>
        </div>
    
      </header>

      <div className="main-content">
        
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
      
            <div className="button-container">
              <button onClick={sendPayment}>Send Payment</button>
            </div>
  
            {recipients.length > 0 && (
              <>
                <button onClick={openPopup}>View Recipients</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
