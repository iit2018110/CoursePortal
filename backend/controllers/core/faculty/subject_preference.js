const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

function faculty_preferences_data(facultyId) {
    let data = sequelize.query(`SELECT core_faculty_preferences.course_id as id,core_courses.name, 
                                core_faculty_preferences.preference_value 
                                FROM core_faculty_preferences
                                JOIN core_courses ON core_faculty_preferences.course_id=core_courses.id
                                WHERE core_faculty_preferences.faculty_id='${facultyId}'`, { type: Sequelize.QueryTypes.SELECT });

    return data;
}

async function get_course_data(stream, mod) {
    let data = sequelize.query(`
    SELECT id,name from core_courses WHERE mod(semester,2)=${mod} AND stream='${stream}'
    ORDER BY semester`, 
    { type: Sequelize.QueryTypes.SELECT });

    return data;
}

module.exports.fetch_subjects = async (req, res) => {
    let facultyId = req.query.faculty_id;
    let stream = req.query.stream;

    if(!facultyId || !stream) {
        res.status(400).json("invalid request!");
    }

    const preferences_count = await db.Core_faculty_preference.count({
        where: {
            faculty_id: facultyId
        }
    })

    if (preferences_count != 0) {
        let data = await faculty_preferences_data(facultyId);

        return res.status(200).json({ status: "filled", data: data })
    }


    let semType = await db.Params.findOne({
        attributes: ['value'],
        where: {
            key: 'sem_type'
        }
    })

    semType = semType.value;
    let mod;

    if (semType === 'even') {
        mod = 0;
    } else {
        mod = 1;
    }

    let course_data = await get_course_data(stream, mod);

    res.status(200).json({status: "non-filled", data: course_data});
}

module.exports.submit_preferences = async (req, res) => {
    let facultyId = req.body.faculty_id;
    let courses = req.body.courses;

    if(!facultyId || !courses) {
        res.status(400).json("invalid request!");
    }

    for (let c in courses) {
        await db.Core_faculty_preference.create({
            faculty_id: facultyId,
            course_id: c,
            preference_value: courses[c] ? courses[c] : 10
        })
    }

    return res.status(200).json("preference for faculty inserted!!");
}