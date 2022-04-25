const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/project/faculty/auth')
const {profile} = require('../../controllers/project/faculty/profile');
const Dashboard = require('../../controllers/project/faculty/dashboard');

router.post('/login', login);
router.get('/get_project_by_project_id', Dashboard.get_project_by_project_id);
router.get('/get_project_by_faculty_id', Dashboard.get_project_by_faculty_id);
router.post('/post_status_by_faculty', Dashboard.post_status_by_faculty);
router.get('/profile', profile);


module.exports = router;