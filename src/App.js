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
      const to = mobileNumber; // Use the mobile number from the state
      const text = message; // Use the message from the state
  
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
  export default App;