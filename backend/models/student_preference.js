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
});

module.exports = Student_preference;