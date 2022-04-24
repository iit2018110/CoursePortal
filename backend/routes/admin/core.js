const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const semType = require('../../controllers/admin/core/sem_type');
const facultyPreferences = require('../../controllers/admin/core/faculty_preferences');
const courseFaculty = require('../../controllers/admin/core/course_faculty');

router.put('/set_sem_type', authMiddleware.authValidator, semType.set_sem_type);
router.get('/get_sem_type', authMiddleware.authValidator, semType.get_sem_type);

/**
 * Faculty preferences.
 */
router.get('/fetch_faculty_preferences_it', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_it);
router.get('/fetch_faculty_preferences_ece', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_ece);

/**
 * Course faculty.
 */
 router.get('/fetch_course_faculty_it', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_it);
 router.get('/fetch_course_faculty_ece', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_ece);
 

module.exports = router;



