const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function basket_courses_data(stream) {
    let query_result = await sequelize.query(`select baskets.id as basket_id,
    baskets.name as basket_name,running_courses.id as course_id,running_courses.name 
    as course_name, running_courses.available_seats as seats
    FROM running_courses
    join baskets on running_courses.basket_id=baskets.id
    where running_courses.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for (let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            seats: query_result[i].seats
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

module.exports.fetch_basket_subjects = async (req, res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    let data = await basket_courses_data(stream);
    return res.status(200).json(data);
}

module.exports.run_course = async (req, res) => {
    let stream = req.body.stream;
    let basketId = req.body.basket_id;
    let courseId = req.body.course_id;

    if(!stream || !basketId || !courseId) {
        return res.status(400).json("invalid request!");
    }

    let total_seats = await sequelize.query(`SELECT total_seats FROM running_courses WHERE basket_id='${basketId}' AND id='${courseId}'`);
    console.log('total_seats', total_seats);
    db.Running_course.update({
        available_seats: total_seats[0][0].total_seats
    },{
        where: {
            basket_id: basketId,
            id: courseId,
            stream: stream
        }
    }).then(()=> {
        return res.status(200).json("Course start running");
    }).catch((err)=>{
        return res.status(400).json("Failed in start courses")
    })
}

module.exports.stop_course = async (req, res) => {
    let stream = req.body.stream;
    let basketId = req.body.basket_id;
    let courseId = req.body.course_id;

    if(!stream || !basketId || !courseId) {
        return res.status(400).json("invalid request!");
    }

    db.Running_course.update({
        available_seats: 0
    },{
        where: {
            basket_id: basketId,
            id: courseId,
            stream: stream
        }
    }).then(()=> {
        return res.status(200).json("Course stopped running");
    }).catch((err)=>{
        return res.status(400).json("Failed in stop courses")
    })
}