const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/validator');

const cc = require('./elective/cc');
const student = require('./elective/student');
const faculty = require('./elective/faculty');
const hod = require('./elective/hod');



const {login} = require('../controllers/elective/auth');

router.use('/cc', cc);
router.use('/faculty', faculty);
router.use('/student', student);
router.use('/hod', hod);

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);

module.exports = router;