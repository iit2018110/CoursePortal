const express = require('express');
const router = express.Router();
const authValidator = require('../middlewares/validator');
const authMiddleware = require('../middlewares/auth');


const elective = require('./admin/elective');
const project = require('./admin/project');
const core = require('./admin/core');
const {login} = require('../controllers/admin/auth');
const portalSetting = require('../controllers/admin/portal_setting');

router.use('/elective', elective);
// router.use('/project', project);
router.use('/core', core);


router.post('/login', authValidator.loginValidatorSchema, authValidator.loginValidator, login);

router.get('/get_portal_timing', authMiddleware.authValidator, portalSetting.get_portal_timing);
router.put('/set_portal_timing', authMiddleware.authValidator, portalSetting.set_portal_timing)

module.exports = router;