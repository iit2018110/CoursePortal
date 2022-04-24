const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const authValidator = require('../../middlewares/validator');


const subjectPreference = require('../../controllers/core/faculty/subject_preference');

router.get('/fetch_subjects', authMiddleware.authValidator, subjectPreference.fetch_subjects);
router.post('/submit_preferences', authMiddleware.authValidator, subjectPreference.submit_preferences);



module.exports = router;