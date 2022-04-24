const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function fetch_data(stream) {
    let data = await sequelize.query(`
        select students.id as student_id, students.name as student_name, baskets.id as basket_id, baskets.name as basket_name, student_preferences.pref1_course_id as pref1_id, student_preferences.pref1_course_name as pref1_name, student_preferences.pref2_course_id as pref2_id, student_preferences.pref2_course_name as pref2_name, student_preferences.pref3_course_id as pref3_id, student_preferences.pref3_course_name as pref3_name, student_preferences.pref4_course_id as pref4_id, student_preferences.pref4_course_name as pref4_name, student_preferences.pref5_course_id as pref5_id, student_preferences.pref5_course_name as pref5_name
        from students
        left join student_preferences on students.id=student_preferences.student_id
        left join baskets on baskets.id=student_preferences.basket_id
        where students.stream='${stream}';`, {type: Sequelize.QueryTypes.SELECT});
    
    let students = [];
    for (let i = 0; i < data.length; i++) {
        let studentId = data[i].student_id;
        let basket = {id: data[i].basket_id, name: data[i].basket_name, pref1_id: data[i].pref1_id,pref1_name: data[i].pref1_name,
                      pref2_id: data[i].pref2_id, pref2_name: data[i].pref2_name,pref3_id: data[i].pref3_id, pref3_name: data[i].pref3_name,
                      pref4_id: data[i].pref4_id, pref4_name: data[i].pref4_name,pref5_id: data[i].pref5_id, pref5_name: data[i].pref5_name
                    };
                    
        let flag = false;
        for (let j = 0; j < students.length; j++) {
            if(studentId===students[j].id) {
                flag = true;
                students[j].baskets.push(basket);
                break;
            }   
        }

        if(!flag) {
            if(basket.id === null) {
                students.push({id: studentId, name: data[i].student_name, baskets: []});
            } else {
                students.push({id: studentId, name: data[i].student_name, baskets: [basket]});
            }   
        }
    }

    return students;
}

module.exports.fetch_it_student_preferences = async (req, res) => {
    let data = await fetch_data('IT');
    return res.status(200).json(data);
}

module.exports.fetch_ece_student_preferences = async (req, res) => {
    let data = await fetch_data('ECE');
    return res.status(200).json(data);
}