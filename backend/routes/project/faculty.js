const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');


const {login} = require('../../controllers/project/faculty/auth')
const {profile} = require('../../controllers/project/faculty/profile');
const Dashboard = require('../../controllers/project/faculty/dashboard');

router.post('/login', login);
router.get('/get_project_by_project_id', authMiddleware.authValidator, Dashboard.get_project_by_project_id);
router.get('/get_project_by_faculty_id', authMiddleware.authValidator, Dashboard.get_project_by_faculty_id);
router.post('/post_status_by_faculty', authMiddleware.authValidator, Dashboard.post_status_by_faculty);
router.get('/profile', authMiddleware.authValidator, profile);

router.get('/get_detail_project', authMiddleware.authValidator, Dashboard.get_detail_project);

module.exports = router;