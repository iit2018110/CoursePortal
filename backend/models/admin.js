const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Admin = sequelize.define('admin', {
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
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Admin;