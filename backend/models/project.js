const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        notNull: true
    },
    Student_id: {
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