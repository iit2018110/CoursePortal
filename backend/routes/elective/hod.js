const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/cc/auth')
const {profile} = require('../../controllers/elective/cc/profile');

router.post('/login', login);
router.get('/profile', profile);


module.exports = router;