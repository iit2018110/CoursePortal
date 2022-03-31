const express = require('express');
const router = express.Router();

// need to change accordingly

const {login} = require('../../controllers/elective/faculty/auth')
const {get_student} = require('../../controllers/elective/faculty/get_student');
const { fetch_subjects, submit_preferences } = require('../../controllers/elective/faculty/subject_preference');
const {profile} = require('../../controllers/elective/faculty/profile');

router.post('/login', login);
router.get('/get_student', get_student)
router.get('/fetch_subjects', fetch_subjects)
router.post('/submit_preferences', submit_preferences);

router.get('/profile', profile);


module.exports = router;