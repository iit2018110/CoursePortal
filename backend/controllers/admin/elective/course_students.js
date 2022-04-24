const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function get_data(stream) {
    let data = await sequelize.query(`select baskets.id as basket_id, baskets.name as basket_name, running_courses.id as course_id,
        running_courses.name as course_name, students.id as student_id, students.name as student_name
        from course_students 
        join running_courses on running_courses.id=course_students.course_id
        join baskets on baskets.id=running_courses.basket_id
        join students on students.id=course_students.student_id
        where running_courses.stream='${stream}'
        order by students.gpa desc;`, { type: Sequelize.QueryTypes.SELECT });

    let basket_students = [];
    for (let i = 0; i < data.length; i++) {
        let flag = false;
        let basketId = data[i].basket_id;

        let student = { id: data[i].student_id, name: data[i].student_name };
        let course = { id: data[i].course_id, name: data[i].course_name, students: [student] };

        for (let j = 0; j < basket_students.length; j++) {
            if (basket_students[j].id === basketId) {
                flag = true;
                let flag1 = false;
                for (let k = 0; k < basket_students[j].courses.length; k++) {
                    if (basket_students[j].courses[k].id === data[i].course_id) {
                        basket_students[j].courses[k].students.push(student);
                        flag1 = true;
                        break;
                    }
                }
                if (!flag1) {
                    basket_students[j].courses.push(course);
                }
            }
        }

        if (!flag) {
            basket_students.push({ id: basketId, name: data[i].basket_name, courses: [course] })
        }
    }

    return basket_students;
}

module.exports.fetch_it_course_students = async (req,res) => {
    let data = await get_data('IT');
    return res.status(200).json(data);
}

module.exports.fetch_ece_course_students = async (req,res) => {
    let data = await get_data('ECE');
    return res.status(200).json(data);
}