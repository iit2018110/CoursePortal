const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const projectManagement = require('../../controllers/admin/project/project_management')

router.get('/get_all_project_detail', authMiddleware.authValidator, projectManagement.get_all_project_detail);
router.delete('/delete_project', authMiddleware.authValidator, projectManagement.delete_project);

router.delete('/reset_project', authMiddleware.authValidator, projectManagement.reset_project);


module.exports = router;
