const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/registraroferta', (req, res) => {
    const twiml = new MessagingResponse();

    // Access the message body and the number it was sent from.
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

    //twiml.message('The Robots are coming! Head for the hills!');

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
});

module.exports = router;