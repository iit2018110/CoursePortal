const express = require('express');
const router = express.Router();

const elective = require('./admin/elective');
const project = require('./admin/project');
const {login} = require('../controllers/admin/auth');

// router.use('/elective', elective);
// router.use('/project', project);

router.post('/login', login);

module.exports = router;