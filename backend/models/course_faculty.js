const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Course_faculty = sequelize.define('course_faculties', {
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    faculty_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Course_faculty;