const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');


const {login} = require('../../controllers/elective/student/auth')
const {profile} = require('../../controllers/elective/student/profile');
const Dashboard = require('../../controllers/elective/student/dashboard');

router.post('/login', login);
router.get('/get_dashboard',authMiddleware.authValidator, Dashboard.get_dashboard);
router.put('/choose_preferences', authMiddleware.authValidator, Dashboard.choose_preferences);
router.put('/remove_preferences', authMiddleware.authValidator, Dashboard.remove_preferences);
router.post('/submit_preferences', authMiddleware.authValidator, Dashboard.submit_preferences);
router.get('/profile', authMiddleware.authValidator, profile);


module.exports = router;