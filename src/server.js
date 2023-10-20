const express = require('express');
const bodyParser = require('body-parser');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
const vonage = new Vonage({
  apiKey: 'b78ec810',
  apiSecret: 'SkV66w8nnV1Wsi0v',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-sms', (req, res) => {
  const from = 'Vonage APIs';
  const to = req.body.recipient_number;
  const text = req.body.message_text;

  async function sendSMS() {
    try {
      const resp = await vonage.sms.send({ to, from, text });
      console.log('Message sent successfully');
      console.log(resp);

      // Send a success response to the client's browser
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
      console.log('There was an error sending the message.');
      console.error(err);

      // Send an error response to the client's browser
      res.status(500).json({ error: 'Message not sent' });
    }
  }

  sendSMS();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

