const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { to, text } = req.body;

  const data = {
    api_key: '473d3aba',
    api_secret: 'ZIu8VnYsav99tSew',
    to: to,
    from: 'WEB3SMS',
    text: text,
  };
  try {
    const response = await axios.post('https://rest.nexmo.com/sms/json', data);
    console.log(response.data);
    res.status(200).send({ message: 'Message sent successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'There was an error sending the message.' });
  }
});

app.listen(4000, () => console.log('Server is running on port 4000'));
