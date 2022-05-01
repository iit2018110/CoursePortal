const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const basket = require('./elective/basket');
const RunningCourses  = require('../../controllers/admin/elective/running_courses');
const facultyPreferences = require('../../controllers/admin/elective/faculty_preferences');
const courseFaculty = require('../../controllers/admin/elective/course_faculty');
const studentPreferences = require('../../controllers/admin/elective/student_preferences');
const courseStudents = require('../../controllers/admin/elective/course_students');
const facultyLoadChart = require('../../controllers/admin/elective/faculty_loadchart');
const reset = require('../../controllers/admin/elective/reset');

router.use('/basket', basket);

router.get('/fetch_it_courses', authMiddleware.authValidator, RunningCourses.fetch_it_courses);
router.get('/fetch_ece_courses', authMiddleware.authValidator, RunningCourses.fetch_ece_courses);

router.get('/fetch_faculty_preferences_it', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_it);
router.get('/fetch_faculty_preferences_ece', authMiddleware.authValidator, facultyPreferences.fetch_faculty_preferences_ece);

router.get('/fetch_course_faculty_it', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_it);
router.get('/fetch_course_faculty_ece', authMiddleware.authValidator, courseFaculty.fetch_course_faculty_ece);

router.get('/fetch_it_student_preferences', authMiddleware.authValidator, studentPreferences.fetch_it_student_preferences);
router.get('/fetch_ece_student_preferences', authMiddleware.authValidator, studentPreferences.fetch_ece_student_preferences);

router.get('/fetch_it_course_students', authMiddleware.authValidator, courseStudents.fetch_it_course_students);
router.get('/fetch_ece_course_students', authMiddleware.authValidator, courseStudents.fetch_ece_course_students);

router.get('/fetch_it_faculty_courses', authMiddleware.authValidator, facultyLoadChart.fetch_it_faculty_courses);
router.get('/fetch_ece_faculty_courses', authMiddleware.authValidator, facultyLoadChart.fetch_ece_faculty_courses);

router.delete('/reset_elective', authMiddleware.authValidator, reset.reset_elective);

module.exports = router;