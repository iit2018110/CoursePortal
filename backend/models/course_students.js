const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Buffer_course_student = sequelize.define('buffer_course_students', {
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    student_id: {
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


const Course_student = sequelize.define('course_students', {
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    student_id: {
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

module.exports = {Buffer_course_student, Course_student};