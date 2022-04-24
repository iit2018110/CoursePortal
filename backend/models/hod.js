const Sequelize = require('sequelize');
const sequelize = require('../utils/database/config');

const HOD = sequelize.define('hods', {
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
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Buffer_basket_hod = sequelize.define('buffer_baskets_hod', {
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Buffer_course_faculty_hod = sequelize.define('buffer_course_faculty_hod', {
    basket_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    basket_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    faculty_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    basket_status: {
        type: Sequelize.STRING,
        defaultValue: 'un-assigned'
    },
    seats: {
        type: Sequelize.INTEGER,
        defaultValue: 60
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

const Buffer_core_course_faculty_hod = sequelize.define('buffer_core_course_faculty_hod', {
    semester: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    course_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    faculty_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sem_status: {
        type: Sequelize.STRING,
        defaultValue: 'un-assigned'
    },
    stream: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});


module.exports = {
                    HOD, Buffer_basket_hod, 
                    Buffer_course_faculty_hod,
                    Buffer_core_course_faculty_hod
                };
