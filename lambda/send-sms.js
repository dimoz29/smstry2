const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  applicationId: process.env.VONAGE_APPLICATION_ID, // replace with your actual Application ID
  privateKey: './private.key', // replace with the path to your private key
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});


exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { to, text } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    vonage.message.sendSms(process.env.VONAGE_PHONE_NUMBER, to, text, (err, responseData) => {
      if (err) {
        reject({ statusCode: 500, body: JSON.stringify(err) });
      } else {
        resolve({ statusCode: 200, body: JSON.stringify(responseData) });
      }
    });
  });
};

