import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Function to handle SMS using Nexmo API
  const sendSMS = async (number, message) => {
    const API_KEY = '473d3aba';
    const API_SECRET = 'ZIu8VnYsav99tSew';
    const URL = 'https://rest.nexmo.com/sms/json';

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `text=${message}&to=${number}&api_key=${API_KEY}&api_secret=${API_SECRET}`
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
            Enter receiver's mobile number:
            <input
              type="text"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              placeholder="Enter receiver's mobile number"
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
