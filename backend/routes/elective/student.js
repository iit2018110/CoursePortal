const express = require('express');
const router = express.Router();

const {login} = require('../../controllers/elective/student/auth')
const {profile} = require('../../controllers/elective/student/profile');
const Dashboard = require('../../controllers/elective/student/dashboard');

router.post('/login', login);
router.get('/get_dashboard', Dashboard.get_dashboard);
router.put('/choose_preferences', Dashboard.choose_preferences);
router.put('/remove_preferences', Dashboard.remove_preferences);
router.post('/submit_preferences', Dashboard.submit_preferences);
router.get('/profile', profile);


module.exports = router;