const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/cc/auth')

router.post('/login', login);

module.exports = router;