const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/hod/auth')
const {profile} = require('../../controllers/elective/hod/profile');
const facultyAssign = require('../../controllers/elective/hod/faculty_assign')

router.post('/login', login);
router.get('/profile', profile);
router.get('/fetch_baskets', facultyAssign.fetch_baskets);
router.get('/fetch_faculties', facultyAssign.fetch_faculties);
router.put('/assign_courses', facultyAssign.assign_courses);
router.put('/unassign_courses', facultyAssign.unassign_courses);
router.post('/submit_assigned_courses', facultyAssign.submit_assigned_courses);

module.exports = router;