const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const authValidator = require('../../middlewares/validator');


const {login} = require('../../controllers/elective/hod/auth')
const {profile} = require('../../controllers/elective/hod/profile');
const facultyAssign = require('../../controllers/elective/hod/faculty_assign');
const counselling = require('../../controllers/elective/hod/counselling');
const courseSetting = require('../../controllers/elective/hod/course_setting');

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);
router.get('/profile',authMiddleware.authValidator, profile);
router.get('/fetch_baskets',authMiddleware.authValidator, facultyAssign.fetch_baskets);
router.get('/fetch_faculties',authMiddleware.authValidator, facultyAssign.fetch_faculties);
router.put('/assign_courses',authMiddleware.authValidator, facultyAssign.assign_courses);
router.put('/unassign_courses',authMiddleware.authValidator, facultyAssign.unassign_courses);
router.post('/submit_assigned_courses',authMiddleware.authValidator, facultyAssign.submit_assigned_courses);

router.get('/fetch_basket_preferences',authMiddleware.authValidator, counselling.fetch_basket_preferences);
router.post('/students_counselling',authMiddleware.authValidator, counselling.students_counselling);
router.post('/submit_students_counselling',authMiddleware.authValidator, counselling.submit_students_couselling);

router.get('/fetch_basket_subjects',authMiddleware.authValidator, courseSetting.fetch_basket_subjects);
router.put('/run_course',authMiddleware.authValidator, courseSetting.run_course);
router.put('/stop_course',authMiddleware.authValidator, courseSetting.stop_course);

router.delete('/reset_assigned_courses',authMiddleware.authValidator, facultyAssign.reset_assigned_courses);

router.delete('/reset_course_students',authMiddleware.authValidator, counselling.reset_course_students);
module.exports = router;