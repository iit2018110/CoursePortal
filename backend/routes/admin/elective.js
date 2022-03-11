const express = require('express');
const router = express.Router();

const basket = require('./elective/basket');

router.use('/basket', basket);

module.exports = router;