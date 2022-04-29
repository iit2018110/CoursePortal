const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/validator');


const faculty = require('./core/faculty');
const hod = require('./core/hod');

const {login} = require('../controllers/core/auth');

router.use('/faculty', faculty);
router.use('/hod', hod);

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);


module.exports = router;