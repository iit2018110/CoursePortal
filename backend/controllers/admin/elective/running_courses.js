const db = require('../../../utils/database/db');

module.exports.fetch_it_courses = async (req,res)=> {
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'IT'
        },
        include: [{
            model: db.Running_course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then((data)=>{
        return res.status(200).json(data);
    }).catch((err) => {
        console.log("err in fetching from it basket", err);
    })
}

module.exports.fetch_ece_courses = async (req,res)=> {
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'ECE'
        },
        include: [{
            model: db.Running_course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then((data)=>{
        return res.status(200).json(data);
    }).catch((err) => {
        console.log("err in fetching from ece basket", err);
    })
}