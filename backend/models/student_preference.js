const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');


const Student_preference = sequelize.define('student_preferences', {
    student_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pref1_course_id : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref1_course_name : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref2_course_id : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref2_course_name : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref3_course_id  : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref3_course_name : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref4_course_id  : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref4_course_name : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref5_course_id  : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref5_course_name : {
        type: Sequelize.STRING,
        defaultValue: null
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Student_preference;