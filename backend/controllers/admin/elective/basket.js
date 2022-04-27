const db = require('../../../utils/database/db');

module.exports.create_basket = async (req,res) => {
    let stream = req.body.stream;
    let id = req.body.basket_id;
    let name = req.body.basket_name;

    if(!stream || !id || !name) {
        return res.status(400).json("invalid request");
    }

    let count = await db.Basket.count({
        where: {
            id: id
        }
    });

    if(count != 0) {
        return res.status(400).json("basketId already exist!");
    }

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

module.exports.add_course = async (req, res) => {
    let basketId = req.body.basket_id;
    let courseId = req.body.course_id;
    let courseName = req.body.course_name;

    if(!basketId || !courseId || !courseName) {
        return res.status(400).json("invalid request");
    }

    let count = await db.Course.count({
        where: {
            id: courseId
        }
    });

    if(count != 0) {
        return res.status(400).json("courseId already exist!");
    }

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

    if(!basketId || !courseId) {
        res.status(400).json("invalid request!");
    }

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

    if(!basketId) {
        res.status(400).json("invalid request!");
    }

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
