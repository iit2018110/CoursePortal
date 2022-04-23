const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const basket = require('./elective/basket');
const RunningCourses  = require('../../controllers/admin/elective/running_courses');
const facultyPreferences = require('../../controllers/admin/elective/faculty_preferences');
const courseFaculty = require('../../controllers/admin/elective/course_faculty');

router.use('/basket', basket);
router.get('/fetch_it_courses', authMiddleware.authValidator, RunningCourses.fetch_it_courses);
router.get('/fetch_ece_courses', authMiddleware.authValidator, RunningCourses.fetch_ece_courses);
router.get('/fetch_faculty_preferences_it', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_it);
router.get('/fetch_faculty_preferences_ece', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_ece);
router.get('/fetch_course_faculty_it', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_it);
router.get('/fetch_course_faculty_ece', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_ece);

module.exports = router;