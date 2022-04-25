const express = require('express');
const router = express.Router();

const student = require('./project/student');
const faculty = require('./project/faculty');

router.use('/faculty', faculty);
router.use('/student', student);

module.exports = router;