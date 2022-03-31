const express = require('express');
const router = express.Router();

const cc = require('./elective/cc');
const student = require('./elective/student');
const faculty = require('./elective/faculty');
const hod = require('./elective/hod');

router.use('/cc', cc);
router.use('/faculty', faculty);
router.use('/student', student);
// router.use('/hod', hod);

module.exports = router;