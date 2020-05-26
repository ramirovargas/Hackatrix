const express = require('express');
const router = express.Router();
const pool = require('../database');
const uuid = require('uuid');

const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    res.render('agro/metrics');
});
module.exports = router;