const express = require('express');
const router = express.Router();

const faculty = require('./core/faculty');
const hod = require('./core/hod');

router.use('/faculty', faculty);
router.use('/hod', hod);

module.exports = router;