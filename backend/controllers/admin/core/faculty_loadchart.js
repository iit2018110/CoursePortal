const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function fetch_courses_by_faculty_id(id) {
    let result = await sequelize.query(`SELECT core_course_faculties.course_id AS id, core_courses.name AS name 
        FROM core_course_faculties
        JOIN core_courses ON core_course_faculties.course_id=core_courses.id
        WHERE core_course_faculties.faculty_id='${id}'`, {type: Sequelize.QueryTypes.SELECT});

    return result;
}

module.exports.fetch_it_faculty_courses = async (req, res) => {
    let faculty_list = await sequelize.query(`SELECT id,name FROM faculties WHERE stream='IT';`,
        {type: Sequelize.QueryTypes.SELECT});

    let faculty_loadchart = [];
    for (let i = 0; i < faculty_list.length; i++) {
        const faculty = {...faculty_list[i], courses: []};
        
        let courses = await fetch_courses_by_faculty_id(faculty.id);
        faculty.courses = courses;
        faculty_loadchart.push(faculty);
    }

    return res.status(200).json(faculty_loadchart);
}

module.exports.fetch_ece_faculty_courses = async (req, res) => {
    let faculty_list = await sequelize.query(`SELECT id,name FROM faculties WHERE stream='ECE';`,
        {type: Sequelize.QueryTypes.SELECT});

    let faculty_loadchart = [];
    for (let i = 0; i < faculty_list.length; i++) {
        const faculty = {...faculty_list[i], courses: []};
        
        let courses = await fetch_courses_by_faculty_id(faculty.id);
        faculty.courses = courses;
        faculty_loadchart.push(faculty);
    }

    return res.status(200).json(faculty_loadchart);
}