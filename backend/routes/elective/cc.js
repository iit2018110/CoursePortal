const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const authValidator = require('../../middlewares/validator');

const {login} = require('../../controllers/elective/cc/auth')
const {profile} = require('../../controllers/elective/cc/profile');
const Dashboard = require('../../controllers/elective/cc/dashboard');

router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);
router.get('/get_dashboard', authMiddleware.authValidator, Dashboard.get_dashboard);
router.put('/accept_course', authMiddleware.authValidator, Dashboard.accept_course);
router.put('/reject_course', authMiddleware.authValidator, Dashboard.reject_course);
router.put('/restore_course', authMiddleware.authValidator, Dashboard.restore_course);
router.post('/submit_courses', authMiddleware.authValidator, Dashboard.submit_courses);
router.get('/profile', authMiddleware.authValidator, profile);

router.delete('/reset_courses', authMiddleware.authValidator, Dashboard.reset_courses);

module.exports = router;