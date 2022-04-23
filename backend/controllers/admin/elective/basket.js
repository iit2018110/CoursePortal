const db = require('../../../utils/database/db');

module.exports.create_basket = (req,res) => {
    let stream = req.body.stream;
    let id = req.body.basket_id;
    let name = req.body.basket_name;

    db.Basket.create({
        stream: stream,
        id: id,
        name: name
    }).then((basket)=>{
        return res.status(200).json(basket);
    }).catch((err) => {
        console.log("err in creating basket", err);
    })
}

module.exports.fetch_it_baskets = (req,res) => {
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'IT'
        },
        include: [{
            model: db.Course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then(async(data)=>{
        return res.status(200).json(data);
    }).catch((err) => {
        console.log("err in fetching from it basket", err);
    })
}

module.exports.fetch_ece_baskets = (req,res) => {
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: 'ECE'
        },
        include: [{
            model: db.Course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then(async(data)=>{
        return res.status(200).json(data);
    }).catch((err) => {
        console.log("err in fetching from it basket", err);
    })
}

module.exports.add_course = (req, res) => {
    let basketId = req.body.basket_id;
    let courseId = req.body.course_id;
    let courseName = req.body.course_name;

    db.Course.create({
        id: courseId,
        name: courseName,
        basket_id: basketId
    }).then((course)=>{
        return res.status(200).json(course);
    }).catch((err)=>{
        console.log("error in adding course in basket",err);
    })
}

module.exports.delete_course = (req,res) => {
    let basketId = req.query.basket_id;
    let courseId = req.query.course_id;

    db.Course.destroy({
        where: {
            id: courseId,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("course deleted");
    }).catch((err)=>{
        console.log("error in deleting course in basket",err);
    })
}

module.exports.delete_basket = (req,res) => {
    let basketId = req.query.basket_id;

    db.Basket.destroy({
        where: {
            id: basketId
        }
    }).then(()=>{
        return res.status(200).json("basket deleted");
    }).catch((err)=>{
        console.log("error in deleting basket",err);
    })

    db.Course.destroy({
        where: {
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("subjects of basket deleted");
    }).catch((err)=>{
        console.log("error in deleting subjects of basket",err);
    })
}
