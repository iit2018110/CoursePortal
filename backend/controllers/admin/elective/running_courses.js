const Sequelize = require('sequelize');
const sequelize = require('../../../utils/database/config');
const db = require('../../../utils/database/db');

async function get_baskets_data(stream) {
    let data = await sequelize.query(`SELECT baskets.id as basket_id, baskets.name as basket_name,
    running_courses.id as course_id, 
    running_courses.name as course_name
    FROM baskets
    left join running_courses on running_courses.basket_id=baskets.id
    where baskets.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];
    for (let i = 0; i < data.length; i++) {
        let basket = data[i];
        let course = { id: basket.course_id, name: basket.course_name };

        let flag = false;
        for (let j = 0; j < baskets.length; j++) {
            if (basket.basket_id == baskets[j].id) {
                flag = true;
                baskets[j].running_courses.push(course);
                break;
            }

        }

        if (!flag) {
            if (!basket.course_id) {
                baskets.push({
                    id: basket.basket_id, name: basket.basket_name, running_courses: []
                });
            } else {
                baskets.push({
                    id: basket.basket_id, name: basket.basket_name, running_courses: [course]
                });
            }
        }
    }

    return baskets;
}

module.exports.fetch_it_courses = async (req,res)=> {
    let courses_data = await get_baskets_data('IT');

    return res.status(200).json(courses_data);
    // db.Basket.findAll({
    //     attributes: ['id', 'name'],
    //     where: {
    //         stream: 'IT'
    //     },
    //     include: [{
    //         model: db.Running_course,
    //         attributes: ['id', 'name'],
    //         required: false
    //     }]
    // }).then((data)=>{
    //     return res.status(200).json(data);
    // }).catch((err) => {
    //     console.log("err in fetching from it basket", err);
    // })
}

module.exports.fetch_ece_courses = async (req,res)=> {
    let courses_data = await get_baskets_data('ECE');

    return res.status(200).json(courses_data);
    // db.Basket.findAll({
    //     attributes: ['id', 'name'],
    //     where: {
    //         stream: 'ECE'
    //     },
    //     include: [{
    //         model: db.Running_course,
    //         attributes: ['id', 'name'],
    //         required: false
    //     }]
    // }).then((data)=>{
    //     return res.status(200).json(data);
    // }).catch((err) => {
    //     console.log("err in fetching from ece basket", err);
    // })
}