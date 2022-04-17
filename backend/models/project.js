const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        notNull: true
    },
    faculty_id: {
        type: Sequelize.STRING,
        notNull: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Student_project = sequelize.define('student_project', {
    project_id: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    student_id: {
        type: Sequelize.STRING,
        notNull: true
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = {Project, Student_project};