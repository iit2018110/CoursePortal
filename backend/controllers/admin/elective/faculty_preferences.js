const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

async function faculty_preferences_data (stream) {
    let data = await sequelize.query(`
        select faculties.id as faculty_id, faculties.name as faculty_name, courses.id as course_id, courses.name as course_name, 
        faculty_preferences.preference_value 
        from faculties
        left join faculty_preferences on faculty_preferences.faculty_id=faculties.id
        left join courses on faculty_preferences.course_id=courses.id
        where faculties.stream='${stream}' AND faculty_preferences.preference_value<10;`, {type: Sequelize.QueryTypes.SELECT});

    let faculties = [];
    for(let i = 0; i < data.length; i++) {
        let facultyId = data[i].faculty_id;
        let course = {id: data[i].course_id, name: data[i].course_name, preference_value: data[i].preference_value};
        let flag = false;
        for (let j = 0; j < faculties.length; j++) {
            if(facultyId===faculties[j].id) {
                flag = true;
                faculties[j].courses.push(course);
                break;
            }
        }

        if(!flag) {
            if(course.id===null) {
            faculties.push({id: facultyId, name: data[i].faculty_name, courses: []});
            }
            else {
            faculties.push({id: facultyId, name: data[i].faculty_name, courses: [course]});
            }
        }
    }

    return faculties  
}

module.exports.fetch_faculty_preferences_it = async (req, res) => {
    let data = await faculty_preferences_data('IT');
    return res.status(200).json(data);
}

module.exports.fetch_faculty_preferences_ece = async (req, res) => {
    let data = await faculty_preferences_data('ECE');
    return res.status(200).json(data);
}