const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/validator');

const student = require('./project/student');
const faculty = require('./project/faculty');

router.use('/faculty', faculty);
router.use('/student', student);

const {login} = require('../controllers/project/auth');

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);

module.exports = router;