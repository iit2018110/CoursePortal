const sequelize = require('../../../utils/database/config');
const db = require('../../../utils/database/db');

module.exports.create_basket = async (req,res) => {
    let stream = req.body.stream;
    let id = req.body.basket_id;
    let name = req.body.basket_name;
    let faculty_id = req.body.faculty_id;

    if(!stream || !id || !name || !faculty_id) {
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

    let cc_count = await db.Course_coordinator.count({
        where: {
            id: faculty_id
        }
    })

    if(cc_count != 0) {
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

module.exports.fetch_it_faculties = async (req, res) => {
    let faculties = await db.Faculty.findAll({
                        attributes: ['id','name'],
                        where: {
                            stream: 'IT'
                        }
                    });
    
    res.status(200).json(faculties);
}

module.exports.fetch_ece_faculties = async (req, res) => {
    let faculties = await db.Faculty.findAll({
                        attributes: ['id','name'],
                        where: {
                            stream: 'ECE'
                        }
                    });
    
    res.status(200).json(faculties);
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

module.exports.delete_basket = async (req,res) => {
    let basketId = req.query.basket_id;

    if(!basketId) {
        res.status(400).json("invalid request!");
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

    res.status(200).json("basket successfully deleted");
}
