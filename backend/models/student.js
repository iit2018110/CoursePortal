const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Student = sequelize.define('students', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gpa: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    },
    degree: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Buffer_basket_student = sequelize.define('buffer_basket_students', {
    student_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_status: {
        type: Sequelize.STRING,
        defaultValue: "non-opted"
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
})

module.exports = {Student, Buffer_basket_student};
