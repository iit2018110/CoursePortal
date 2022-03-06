const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Basket = sequelize.define('baskets', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true,
        unique: true
    },
    stream: {
        type: Sequelize.STRING,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Basket;