const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "b78ec810",
  apiSecret: "SkV66w8nnV1Wsi0v"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { to, text } = req.body;
  vonage.sms.send(to, "WEB3SMS", text, (err, responseData) => {
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
