import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import './App.css';

const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sendPayment","outputs":[],"stateMutability":"payable","type":"function"}];
const CONTRACT_ADDRESS =  '0xB5364e95BAC807F262744Dedd87BBF5b70504855';

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

      // Send SMS through the server
      const to = mobileNumber;
      const text = message;

      try {
        await axios.post('http://localhost:4000/send-sms', { to, text });
        console.log('Message sent successfully');
      } catch (err) {
        console.log('There was an error sending the messages.');
        console.error(err);
      }

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
      {/* ... rest of the JSX ... */}
    </div>
  );
}

export default App;
