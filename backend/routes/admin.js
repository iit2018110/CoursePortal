const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/validator');

const elective = require('./admin/elective');
const project = require('./admin/project');
const core = require('./admin/core');
const {login} = require('../controllers/admin/auth');

router.use('/elective', elective);
// router.use('/project', project);
router.use('/core', core);

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);

module.exports = router;