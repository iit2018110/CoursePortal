const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const basket = require('./elective/basket');
const RunningCourses  = require('../../controllers/admin/elective/running_courses');

router.use('/basket', basket);
router.get('/fetch_it_courses', authMiddleware.authValidator, RunningCourses.fetch_it_courses);
router.get('/fetch_ece_courses', authMiddleware.authValidator, RunningCourses.fetch_ece_courses);


module.exports = router;