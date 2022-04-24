const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');


const Core_faculty_preference = sequelize.define('core_faculty_preferences', {
    faculty_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preference_value: {
        type: Sequelize.INTEGER,
        defaultValue: 10
    }
}, {
    freezeTableName: true,
});

module.exports = Core_faculty_preference;