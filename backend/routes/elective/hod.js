const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/hod/auth')
const {profile} = require('../../controllers/elective/hod/profile');
const facultyAssign = require('../../controllers/elective/hod/faculty_assign');
const counselling = require('../../controllers/elective/hod/counselling');
const courseSetting = require('../../controllers/elective/hod/course_setting');

router.post('/login', login);
router.get('/profile', profile);
router.get('/fetch_baskets', facultyAssign.fetch_baskets);
router.get('/fetch_faculties', facultyAssign.fetch_faculties);
router.put('/assign_courses', facultyAssign.assign_courses);
router.put('/unassign_courses', facultyAssign.unassign_courses);
router.post('/submit_assigned_courses', facultyAssign.submit_assigned_courses);

router.get('/fetch_basket_preferences', counselling.fetch_basket_preferences);
router.post('/students_counselling', counselling.students_counselling);
router.post('/submit_students_counselling', counselling.submit_students_couselling);

router.get('/fetch_basket_subjects', courseSetting.fetch_basket_subjects);
router.put('/run_course', courseSetting.run_course);
router.put('/stop_course', courseSetting.stop_course);

module.exports = router;