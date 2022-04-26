const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');


const {login} = require('../../controllers/project/student/auth')
const {profile} = require('../../controllers/project/student/profile');
const Dashboard = require('../../controllers/project/student/dashboard');

router.post('/login', login);
router.get('/get_faculty_list', authMiddleware.authValidator, Dashboard.get_faculty_list);
router.get('/get_project_by_project_id', authMiddleware.authValidator, Dashboard.get_project_by_project_id);
router.get('/get_project_by_student_id', authMiddleware.authValidator, Dashboard.get_project_by_student_id);
router.post('/post_project_by_student', authMiddleware.authValidator, Dashboard.post_project_by_student);
router.post('/post_status_by_student', authMiddleware.authValidator, Dashboard.post_status_by_student);
router.get('/profile', authMiddleware.authValidator, profile);

router.get('/get_detail_project', authMiddleware.authValidator, Dashboard.get_detail_project);

module.exports = router;