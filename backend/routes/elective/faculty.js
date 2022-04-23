const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const authValidator = require('../../middlewares/validator');


// need to change accordingly

const {login} = require('../../controllers/elective/faculty/auth')
const {fetch_students} = require('../../controllers/elective/faculty/get_student');
const { fetch_subjects, submit_preferences } = require('../../controllers/elective/faculty/subject_preference');
const {profile} = require('../../controllers/elective/faculty/profile');

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);
router.get('/fetch_students', fetch_students)
router.get('/fetch_subjects', authMiddleware.authValidator, fetch_subjects)
router.post('/submit_preferences', authMiddleware.authValidator, submit_preferences);

router.get('/profile',authMiddleware.authValidator, profile);


module.exports = router;