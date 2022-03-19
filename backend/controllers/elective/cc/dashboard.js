const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

module.exports.get_dashboard = async (req, res)=> {
    let basketId = req.query.basket_id;

    let running_course_data =  await db.Running_course.findAndCountAll({
                        attributes: ['id', 'name'],
                        where: {
                            basket_id: basketId
                        }
                    })
    
    if(running_course_data.count != 0) {
        return res.status(200).json({status: "running", data: running_course_data.rows});
    }

    let buffer_course_data = await db.Buffer_course_cc.findAndCountAll({
                                        attributes: ['id', 'name', 'status'],
                                        where: {
                                            basket_id: basketId
                                        }
                                    })

    if(buffer_course_data.count != 0) {
        return res.status(200).json({status: "buffer", data: buffer_course_data.rows});
    }

    await sequelize.query('INSERT INTO buffer_courses_cc (id, name , basket_id) SELECT id, name, basket_id FROM courses');

    let buffer_course_data1 = await db.Buffer_course_cc.findAndCountAll({
                                        attributes: ['id', 'name', 'status'],
                                        where: {
                                            basket_id: basketId
                                        }
                                    })
    
    return res.status(200).json({status: "buffer", data: buffer_course_data1.rows});
}

module.exports.accept_course = (req, res) => {
    let courseId = req.body.course_id;
    let basketId = req.body.basket_id;

    db.Buffer_course_cc.update({status: 'selected'}, {
        where: {
            id: courseId,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("status updated successfully!!");
    }).catch((err)=>{
        return res.status(400).json("error in accept course");
    })
}

module.exports.reject_course = (req, res) => {
    let courseId = req.body.course_id;
    let basketId = req.body.basket_id;

    db.Buffer_course_cc.update({status: 'rejected'}, {
        where: {
            id: courseId,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("status updated successfully!!");
    }).catch((err)=>{
        return res.status(400).json("error in reject course");
    })
}

module.exports.restore_course = (req, res) => {
    let courseId = req.body.course_id;
    let basketId = req.body.basket_id;

    db.Buffer_course_cc.update({status: 'pending'}, {
        where: {
            id: courseId,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("status updated successfully!!");
    }).catch((err)=>{
        return res.status(400).json("error in accept course");
    })
}

module.exports.submit_courses = async (req,res) => {
    let basketId = req.body.basket_id;

    await sequelize.query(`INSERT INTO running_courses (id, name , basket_id) SELECT id, name, basket_id FROM buffer_courses_cc WHERE basket_id='${basketId}' AND status='selected'`);

    db.Buffer_course_cc.destroy({truncate: true, cascade: false})
    .then(()=>{
        return res.status(200).json("successfully submittd!!");
    }).catch((err)=>{
        console.log("error in submitting from course-coordinator",err);
        return res.status(400).json("error in submitting from course-coordinator");
    }) 
}

// onSubmit: delete from buffer