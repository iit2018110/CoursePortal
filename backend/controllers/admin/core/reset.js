const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

module.exports.reset_core = async (req, res) => {
    
    await sequelize.query(`truncate table core_course_faculties;`)
    await sequelize.query(`truncate table buffer_core_course_faculty_hod;`)
    await sequelize.query(`truncate table core_faculty_preferences;`)
    
    return res.status(200).json("successfull reset!");
}