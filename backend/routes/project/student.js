const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/project/student/auth')
const {profile} = require('../../controllers/project/student/profile');
const Dashboard = require('../../controllers/project/student/dashboard');

router.post('/login', login);
router.get('/get_project_by_project_id', Dashboard.get_project_by_project_id);
router.get('/post_project_by_student', Dashboard.post_project_by_student);
// router.put('/choose_preferences', Dashboard.choose_preferences);
// router.put('/remove_preferences', Dashboard.remove_preferences);
// router.post('/submit_preferences', Dashboard.submit_preferences);
router.get('/profile', profile);


module.exports = router;