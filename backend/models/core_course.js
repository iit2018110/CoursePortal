const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Core_course = sequelize.define('core_courses', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    semester: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    degree: {
        type: Sequelize.STRING,
        notNull: true
    },
    stream: {
        type: Sequelize.STRING,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Core_course;