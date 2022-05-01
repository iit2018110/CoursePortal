const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

module.exports.reset_elective = async (req, res) => {
    
    await sequelize.query(`truncate table course_students;`)
    await sequelize.query(`truncate table course_faculties;`)
    await sequelize.query(`truncate table buffer_courses_cc;`)
    await sequelize.query(`truncate table buffer_course_students;`)
    await sequelize.query(`truncate table buffer_course_faculty_hod;`)
    await sequelize.query(`truncate table buffer_basket_students;`)
    await sequelize.query(`truncate table buffer_baskets_hod;`)
    await sequelize.query(`truncate table student_preferences;`)
    await sequelize.query(`truncate table faculty_preferences;`)
    await sequelize.query(`truncate table running_courses;`)
    
    res.status(200).json("successfull reset!");
}