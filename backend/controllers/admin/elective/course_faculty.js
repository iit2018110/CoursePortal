const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function course_faculty_data(stream) {
    let query_result = await sequelize.query(`select baskets.id as basket_id,
    baskets.name as basket_name,running_courses.id as course_id,running_courses.name 
    as course_name,faculties.id as faculty_id,faculties.name as faculty_name, running_courses.total_seats as seats
    from course_faculties
    join baskets on baskets.id=course_faculties.basket_id
    join running_courses on running_courses.id=course_faculties.course_id
    join faculties on faculties.id=course_faculties.faculty_id
    where course_faculties.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for (let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            seats: query_result[i].seats,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };

        for (let j = 0; j < baskets.length; j++) {
            if (query_result[i].basket_id === baskets[j].id) {
                flag = true;
                baskets[j].courses.push(course);
            }
        }

        if (!flag) {
            baskets.push({ id: query_result[i].basket_id, name: query_result[i].basket_name, courses: [course] })
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