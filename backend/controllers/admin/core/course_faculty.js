const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function course_faculty_data(stream) {
    let query_result = await sequelize.query(`select core_courses.semester as semester,core_courses.id as course_id,core_courses.name 
    as course_name,faculties.id as faculty_id,faculties.name as faculty_name
    from core_course_faculties
    join core_courses on core_courses.id=core_course_faculties.course_id
    join faculties on faculties.id=core_course_faculties.faculty_id
    where core_course_faculties.stream='${stream}'
    order by core_courses.semester;`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for (let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };

        for (let j = 0; j < baskets.length; j++) {
            if (query_result[i].semester === baskets[j].semester) {
                flag = true;
                baskets[j].courses.push(course);
            }
        }

        if (!flag) {
            baskets.push({ semester: query_result[i].semester, courses: [course] })
        }

    }

    return baskets;
}

module.exports.fetch_course_faculty_it = async (req,res)=> {
    let data = await course_faculty_data('IT');
    return res.status(200).json(data);
}

module.exports.fetch_course_faculty_ece = async (req,res)=> {
    let data = await course_faculty_data('ECE');
    return res.status(200).json(data);
}