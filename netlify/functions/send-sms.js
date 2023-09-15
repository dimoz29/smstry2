const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: "473d3aba",
  apiSecret: "ZIu8VnYsav99tSew"
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { number, message } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    vonage.sms.send({ to: number, from: "Vonage APIs", text: message }, (err, responseData) => {
      if (err) {
        reject({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
      } else {
        resolve({ statusCode: 200, body: JSON.stringify({ data: responseData }) });
      }
    });
  });
};
