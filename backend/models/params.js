const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');


const Params = sequelize.define('params', {
    key: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Params;