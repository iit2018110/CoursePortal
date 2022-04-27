const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

function faculty_preferences_data(facultyId) {
    let data = sequelize.query(`SELECT faculty_preferences.course_id as id,courses.name, 
                                faculty_preferences.preference_value 
                                FROM faculty_preferences
                                JOIN courses ON faculty_preferences.course_id=courses.id
                                WHERE faculty_preferences.faculty_id='${facultyId}'`, { type: Sequelize.QueryTypes.SELECT });
    
    return data;
}

module.exports.fetch_subjects = async (req,res) => {
    let facultyId = req.query.faculty_id;
    const stream = req.query.stream;

    if(!facultyId || !stream) {
        res.status(400).json("invalid request!");
    }

    const preferences_count = await db.Faculty_preference.count({
        where: {
            faculty_id: facultyId        
        }
    })

    if(preferences_count != 0) {
        let data = await faculty_preferences_data(facultyId);

        return res.status(200).json({status: "filled", data: data})
    }
    
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: stream
        },
        include: [{
            model: db.Running_course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then(async(data)=>{
        return res.status(200).json({status: "non-filled", data: data});
    }).catch((err) => {
        console.log("err in fetching from basket", err);
    })
}

module.exports.submit_preferences = async (req, res) => {
    let facultyId = req.body.faculty_id;
    let courses = req.body.courses;

    if(!facultyId || !courses) {
        res.status(400).json("invalid request!");
    }

    for(let c in courses) {
        await db.Faculty_preference.create({
            faculty_id: facultyId,
            course_id: c,
            preference_value: courses[c] ? courses[c] : 10
        })
    }

    return res.status(200).json("preference for faculty inserted!!");
}

module.exports.get_alloted_courses = async (req,res) => {
    let facultyId = req.query.faculty_id;

    if(!facultyId) {
        res.status(400).json("invalid request!");
    }

    let result = await sequelize.query(`SELECT course_faculties.course_id AS id, running_courses.name AS name 
        FROM course_faculties
        JOIN running_courses ON course_faculties.course_id=running_courses.id
        WHERE course_faculties.faculty_id='${facultyId}'`, {type: Sequelize.QueryTypes.SELECT});

    res.status(200).json(result);
}