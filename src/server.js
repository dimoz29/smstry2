const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "473d3aba",
  apiSecret: "ZIu8VnYsav99tSew"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { to, text } = req.body;
  vonage.message.sendSms("Vonage APIs", to, text, (err, responseData) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'There was an error sending the messages.' });
    } else {
      console.log(responseData);
      res.status(200).send({ message: 'Message sent successfully' });
    }
  });
});

app.listen(4000, () => console.log('Server is running on port 4000'));
