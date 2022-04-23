const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/project/student/auth')
const {profile} = require('../../controllers/project/student/profile');
const Dashboard = require('../../controllers/project/student/dashboard');

router.post('/login', login);
router.get('/get_project_by_project_id', Dashboard.get_project_by_project_id);
router.get('/get_project_by_student_id', Dashboard.get_project_by_student_id);
router.post('/post_project_by_student', Dashboard.post_project_by_student);
router.post('/post_status_by_student', Dashboard.post_status_by_student);
router.get('/profile', profile);


module.exports = router;