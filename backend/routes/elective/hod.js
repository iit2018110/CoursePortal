const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/hod/auth')
const {profile} = require('../../controllers/elective/hod/profile');
const facultyAssign = require('../../controllers/elective/hod/faculty_assign')

router.post('/login', login);
router.get('/profile', profile);
router.get('/fetch_baskets', facultyAssign.fetch_baskets);


module.exports = router;