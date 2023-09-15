import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Function to handle SMS using the serverless function
  const sendSMS = async (number, message) => {
    const SERVERLESS_FUNCTION_URL = 'YOUR_SERVERLESS_FUNCTION_URL_HERE';

    try {
      const response = await fetch(SERVERLESS_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number, message })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
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
