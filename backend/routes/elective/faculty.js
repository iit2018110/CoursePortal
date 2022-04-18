const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');


// need to change accordingly

const {login} = require('../../controllers/elective/faculty/auth')
const {get_student} = require('../../controllers/elective/faculty/get_student');
const { fetch_subjects, submit_preferences } = require('../../controllers/elective/faculty/subject_preference');
const {profile} = require('../../controllers/elective/faculty/profile');

router.post('/login', login);
router.get('/get_student', authMiddleware.authValidator, get_student)
router.get('/fetch_subjects', authMiddleware.authValidator, fetch_subjects)
router.post('/submit_preferences', authMiddleware.authValidator, submit_preferences);

router.get('/profile',authMiddleware.authValidator, profile);


module.exports = router;