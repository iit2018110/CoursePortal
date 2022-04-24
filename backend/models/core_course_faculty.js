const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Core_course_faculty = sequelize.define('core_course_faculties', {
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    faculty_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    semester: {
        type: Sequelize.INTEGER,
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

module.exports = Core_course_faculty;