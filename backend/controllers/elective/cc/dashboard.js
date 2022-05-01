const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

module.exports.get_dashboard = async (req, res)=> {
    let basketId = req.query.basket_id;

    if(!basketId) {
        return res.status(400).json("invalid request!");
    }

    let running_course_data =  await db.Running_course.findAndCountAll({
                        attributes: ['id', 'name'],
                        where: {
                            basket_id: basketId
                        }
                    });
    
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

    await sequelize.query(`INSERT INTO buffer_courses_cc (id, name , basket_id) SELECT id, name, basket_id FROM courses
        WHERE basket_id='${basketId}'`);

    let buffer_course_data1 = await db.Buffer_course_cc.findAndCountAll({
                                        attributes: ['id', 'name', 'status'],
                                        where: {
                                            basket_id: basketId
                                        }
                                    })
    
    return res.status(200).json({status: "buffer", data: buffer_course_data1.rows});
}

module.exports.reset_courses = async (req, res) => {
    let basketId = req.query.basket_id;

    if(!basketId) {
        return res.status(400).json("invalid request!");
    }

    await db.Running_course.destroy({
        where: {
            basket_id: basketId
        }
    });

    return res.status(200).json("courses reset successfully");
}

module.exports.accept_course = (req, res) => {
    let courseId = req.body.course_id;
    let basketId = req.body.basket_id;

    if(!courseId || !basketId) {
        return res.status(400).json("invalid request!");
    }

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

    if(!courseId || !basketId) {
        return res.status(400).json("invalid request!");
    }

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

    if(!courseId || !basketId) {
        return res.status(400).json("invalid request!");
    }

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
    let stream = req.body.stream;

    if(!basketId) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`INSERT INTO running_courses (id, name , basket_id, stream) SELECT id, name, basket_id, '${stream}' as stream FROM buffer_courses_cc WHERE basket_id='${basketId}' AND status='selected'`);

    //await sequelize.query(`DELETE FROM buffer_courses_cc WHERE basket_id='${basketId}'`);
    await db.Buffer_course_cc.destroy({
        where: {
            basket_id: basketId
        }
    })
    
    return res.status(200).json("successfully submittd!!");
}

// onSubmit: delete from buffer