const Sequelize = require('sequelize');
const sequelize = require('../../../utils/database/config');
const db = require('../../../utils/database/db');

module.exports.create_basket = async (req, res) => {
    let stream = req.body.stream;
    let id = req.body.basket_id;
    let name = req.body.basket_name;
    let faculty_id = req.body.faculty_id;

    if (!stream || !id || !name || !faculty_id) {
        return res.status(400).json("invalid request");
    }

    let count = await db.Basket.count({
        where: {
            id: id
        }
    });

    if (count != 0) {
        return res.status(400).json("basketId already exist!");
    }

    let cc_count = await db.Course_coordinator.count({
        where: {
            id: faculty_id
        }
    })

    if (cc_count != 0) {
        return res.status(400).json("Course-coordinator already assined in other basket");
    }

    await db.Basket.create({
        stream: stream,
        id: id,
        name: name
    })

    await sequelize.query(`INSERT INTO course_coordinators (id,name,email,password,stream,basket_id) 
        SELECT id,name,email,password,stream,'${id}' AS basket_id FROM faculties
        WHERE faculties.id='${faculty_id}';`);

    return res.status(200).json("basket created successfully");

}

async function get_baskets_data(stream) {
    let data = await sequelize.query(`SELECT baskets.id as basket_id, baskets.name as basket_name,
    course_coordinators.id as cc_id, course_coordinators.name as cc_name, courses.id as course_id, 
    courses.name as course_name
    FROM baskets
    join course_coordinators on course_coordinators.basket_id=baskets.id
    left join courses on courses.basket_id=baskets.id
    where baskets.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];
    for (let i = 0; i < data.length; i++) {
        let basket = data[i];
        let course = { id: basket.course_id, name: basket.course_name };

        let flag = false;
        for (let j = 0; j < baskets.length; j++) {
            if (basket.basket_id == baskets[j].id) {
                flag = true;
                baskets[j].courses.push(course);
                break;
            }

        }

        if (!flag) {
            if (!basket.course_id) {
                baskets.push({
                    id: basket.basket_id, name: basket.basket_name,
                    cc_id: basket.cc_id, cc_name: basket.cc_name, courses: []
                });
            } else {
                baskets.push({
                    id: basket.basket_id, name: basket.basket_name,
                    cc_id: basket.cc_id, cc_name: basket.cc_name, courses: [course]
                });
            }
        }
    }

    return baskets;
}

module.exports.fetch_it_baskets = async (req, res) => {
    let baskets_data = await get_baskets_data('IT');

    return res.status(200).json(baskets_data);
    // db.Basket.findAll({
    //     attributes: ['id', 'name'],
    //     where: {
    //         stream: 'IT'
    //     },
    //     include: [{
    //         model: db.Course,
    //         attributes: ['id', 'name'],
    //         required: false
    //     }]
    // }).then(async(data)=>{
    //     return res.status(200).json(data);
    // }).catch((err) => {
    //     console.log("err in fetching from it basket", err);
    // })
}

module.exports.fetch_ece_baskets = async (req, res) => {
    let baskets_data = await get_baskets_data('ECE');

    return res.status(200).json(baskets_data);
    // db.Basket.findAll({
    //     attributes: ['id', 'name'],
    //     where: {
    //         stream: 'ECE'
    //     },
    //     include: [{
    //         model: db.Course,
    //         attributes: ['id', 'name'],
    //         required: false
    //     }]
    // }).then(async (data) => {
    //     return res.status(200).json(data);
    // }).catch((err) => {
    //     console.log("err in fetching from it basket", err);
    // })
}

module.exports.fetch_it_faculties = async (req, res) => {
    let faculties = await db.Faculty.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'IT'
        }
    });

    return res.status(200).json(faculties);
}

module.exports.fetch_ece_faculties = async (req, res) => {
    let faculties = await db.Faculty.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'ECE'
        }
    });

    return res.status(200).json(faculties);
}

module.exports.add_course = async (req, res) => {
    let basketId = req.body.basket_id;
    let courseId = req.body.course_id;
    let courseName = req.body.course_name;

    if (!basketId || !courseId || !courseName) {
        return res.status(400).json("invalid request");
    }

    let count = await db.Course.count({
        where: {
            id: courseId
        }
    });

    if (count != 0) {
        return res.status(400).json("courseId already exist!");
    }

    db.Course.create({
        id: courseId,
        name: courseName,
        basket_id: basketId
    }).then((course) => {
        return res.status(200).json(course);
    }).catch((err) => {
        console.log("error in adding course in basket", err);
    })
}

module.exports.delete_course = (req, res) => {
    let basketId = req.query.basket_id;
    let courseId = req.query.course_id;

    if (!basketId || !courseId) {
        return res.status(400).json("invalid request!");
    }

    db.Course.destroy({
        where: {
            id: courseId,
            basket_id: basketId
        }
    }).then(() => {
        return res.status(200).json("course deleted");
    }).catch((err) => {
        console.log("error in deleting course in basket", err);
    })
}

module.exports.delete_basket = async (req, res) => {
    let basketId = req.query.basket_id;

    if (!basketId) {
        return res.status(400).json("invalid request!");
    }

    await db.Basket.destroy({
        where: {
            id: basketId
        }
    });

    await db.Course.destroy({
        where: {
            basket_id: basketId
        }
    });

    await db.Course_coordinator.destroy({
        where: {
            basket_id: basketId
        }
    });

    return res.status(200).json("basket successfully deleted");
}
