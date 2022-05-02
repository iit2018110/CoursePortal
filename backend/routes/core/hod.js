const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const facultyAssign = require('../../controllers/core/hod/faculty_assign');

router.get('/fetch_courses',authMiddleware.authValidator, facultyAssign.fetch_courses);
router.get('/fetch_faculties',authMiddleware.authValidator, facultyAssign.fetch_faculties);
router.put('/assign_courses',authMiddleware.authValidator, facultyAssign.assign_courses);
router.put('/unassign_courses',authMiddleware.authValidator, facultyAssign.unassign_courses);
router.post('/submit_assigned_courses',authMiddleware.authValidator, facultyAssign.submit_assigned_courses);
router.delete('/reset_assigned_courses',authMiddleware.authValidator, facultyAssign.reset_assigned_courses);

module.exports = router;