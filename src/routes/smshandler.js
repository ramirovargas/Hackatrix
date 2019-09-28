const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const pool = require('../database');
const uuid = require('uuid');
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults("66bc3bb83753fcc198ec2346a76d3a02e7d2a74d0b1bcfc7fec14b5a062a0ff8")

router.post('/registraroferta', (req, res) => {
    const twiml = new MessagingResponse();

    // Access the message body and the number it was sent from.
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    var body = req.body.Body;
    //var body = 'Coco:El Retiro:500:150000:2019-11-20#';
    console.log(body);
    body = body.replace(/\s+/g, '');
    body = body.substring(0, body.indexOf('#'));
    body = body.split(':');
    var image_url = '';
    var parameter = {
        engine: "google",
        ijn: "0",
        q: body[0]+' cultivo',
        google_domain: "google.com",
        tbm: "isch",
    };
    
    var callback = function(data) {
      image_url = data.images_results[0].original;
      pool.query('INSERT INTO agro set url_path = ? ,id = ?, product_name = ?, product_location = ?, quantity = ?, initial_value = ?, startdate = ?, user_id = ?', [image_url, uuid(), body[0], body[1], body[2], body[3], body[4], 'e295b64e-46f8-4e72-92d4-07fe1559822a']);
    }
    
    // Show result as JSON
    client.json(parameter, callback)
    //twiml.message('The Robots are coming! Head for the hills!');

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
});

module.exports = router;