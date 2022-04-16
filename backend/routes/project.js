const express = require('express');
const router = express.Router();

// const cc = require('./project/cc');
const student = require('./project/student');
// const faculty = require('./project/faculty');
// const hod = require('./project/hod');

// router.use('/cc', cc);
// router.use('/faculty', faculty);
router.use('/student', student);
// router.use('/hod', hod);

module.exports = router;