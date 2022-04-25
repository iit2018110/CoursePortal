const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Portal_status = sequelize.define('portal_status', {
    user_type: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    start_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    end_time: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Portal_status;