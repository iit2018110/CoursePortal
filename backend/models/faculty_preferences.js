const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');


const Faculty_preference = sequelize.define('faculty_preferences', {
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

module.exports = Faculty_preference;