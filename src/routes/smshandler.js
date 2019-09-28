const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const pool = require('../database');

router.post('/registraroferta', (req, res) => {
    const twiml = new MessagingResponse();

    // Access the message body and the number it was sent from.
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    var body = req.body.Body;
    body = body.substring(0, body.indexOf('#'));
    body = body.split(':');
    pool.query('INSERT INTO agro set product_name = ?, product_location = ?, quantity = ?, initial_value = ?, startdate = ?', [body[0], body[1], body[2], body[3], body[4]]);
    //twiml.message('The Robots are coming! Head for the hills!');

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
});

module.exports = router;