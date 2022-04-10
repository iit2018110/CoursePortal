const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Course = sequelize.define('courses', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    basket_id: {
        type: Sequelize.STRING,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Running_course = sequelize.define('running_courses', {
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
    stream: {
        type: Sequelize.STRING,
        notNull: true
    },
    total_seats: {
        type: Sequelize.INTEGER,
        defaultValue: 60
    },
    available_seats: {
        type: Sequelize.INTEGER,
        defaultValue: 60
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = {Course, Running_course};