const express = require('express');
const router = express.Router();

const {verify_token} = require('../utils/jwt-token/jwt');

router.post('/verify_token', verify_token);

module.exports = router;