const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Course_coordinator = sequelize.define('course_coordinators', {
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
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Buffer_course_cc = sequelize.define('buffer_courses_cc', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true
    },
    basket_id: {
        type: Sequelize.STRING,
        notNull: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = {Course_coordinator, Buffer_course_cc};
