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
        allowNull: false
    },
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_status: {
        type: Sequelize.STRING,
        defaultValue: "toOpt"
    },
    pref_1 : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref_2 : {
        type: Sequelize.STRING,
        defaultValue: null
    },
    pref_3 : {
        type: Sequelize.STRING,
        defaultValue: null
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = {Student, Buffer_basket_student};
