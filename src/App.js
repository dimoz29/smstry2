import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Function to handle SMS using netlify functions
  const sendSMS = async (number, message) => {
    const response = await fetch('/.netlify/functions/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: number,
        text: message
      })
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
        <div className="button-container">
          <button onClick={() => sendSMS(mobileNumber, message)}>Send SMS</button>
        </div>
      </div>
    </div>
  );
}

export default App;
