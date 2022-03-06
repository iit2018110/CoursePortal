const Sequelize = require('sequelize');

const sequelize = new Sequelize('CoursePortal', 'root', process.env.DATABASEPASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;