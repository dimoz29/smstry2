const express = require('express');
const app = express()
const cors = require('cors')
const { Vonage } = require('@vonage/server-sdk');

app.use(express.json())
app.use(cors())


const vonage = new Vonage({
    apiKey: "473d3aba",
    apiSecret: "ZIu8VnYsav99tSew",
  });


app.post('/apitext' , async (req , res)=>{
    const resp = await vonage.sms.send({
        to: req.body.number,
        from: "Vonage APIs",
        text: req.body.message,
    });

    res.send(resp)
} )


app.listen(8080 , ()=>{
    console.log('server is running on port 8080')
})