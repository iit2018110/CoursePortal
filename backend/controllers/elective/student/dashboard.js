const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function fun(id) {
    let query_result = await sequelize.query(`select buffer_basket_students.basket_id as basket_id, 
        buffer_basket_students.basket_name as basket_name, buffer_basket_students.basket_status as basket_status,
        buffer_basket_students.pref1_course_id as pref1_course_id, buffer_basket_students.pref1_course_name as pref1_course_name,
        buffer_basket_students.pref2_course_id as pref2_course_id, buffer_basket_students.pref2_course_name as pref2_course_name,
        buffer_basket_students.pref3_course_id as pref3_course_id, buffer_basket_students.pref3_course_name as pref3_course_name,
        buffer_basket_students.pref4_course_id as pref4_course_id, buffer_basket_students.pref4_course_name as pref4_course_name,
        buffer_basket_students.pref5_course_id as pref5_course_id, buffer_basket_students.pref5_course_name as pref5_course_name,
        running_courses.id as course_id, running_courses.name as course_name, faculties.id as faculty_id, faculties.name as faculty_name
        from buffer_basket_students
        join course_faculties
        on course_faculties.basket_id=buffer_basket_students.basket_id
        join running_courses
        on running_courses.id=course_faculties.course_id
        join faculties
        on faculties.id=course_faculties.faculty_id
        where buffer_basket_students.student_id='${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for(let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {id: query_result[i].course_id, name: query_result[i].course_name, faculty: {id: query_result[i].faculty_id, name: query_result[i].faculty_name}};

        for(let j = 0; j < baskets.length; j++) {
            if(query_result[i].basket_id === baskets[j].id) {
                flag = true;
                baskets[j].courses.push(course);
            }
        }

        if(!flag) {
            baskets.push({id: query_result[i].basket_id, name: query_result[i].basket_name, status: query_result[i].basket_status, 
                pref1_course_id:query_result[i].pref1_course_id, pref1_course_name: query_result[i].pref1_course_name,
                pref2_course_id:query_result[i].pref2_course_id, pref2_course_name: query_result[i].pref2_course_name,
                pref3_course_id:query_result[i].pref3_course_id, pref3_course_name: query_result[i].pref3_course_name,
                pref4_course_id:query_result[i].pref4_course_id, pref4_course_name: query_result[i].pref4_course_name, 
                pref5_course_id:query_result[i].pref5_course_id, pref5_course_name: query_result[i].pref5_course_name,    
                courses: [course]})
        }
        
    }

    return baskets;
}

module.exports.get_dashboard = async (req, res)=> {
    let id = req.query.student_id;
    let stream = req.query.stream;

    if(!id || !stream) {
        return res.status(400).json("invalid request!");
    }

    let student_pref_data =  await db.Student_preference.findAndCountAll({
        attributes: [['basket_id', 'id'],['basket_name', 'name'],'pref1_course_id','pref1_course_name',
            'pref2_course_id','pref2_course_name','pref3_course_id','pref3_course_name','pref4_course_id','pref4_course_name','pref5_course_id','pref5_course_name'],
        where: {
            student_id: id
        }
    });

    if(student_pref_data.count != 0) {
        return res.status(200).json({status: "filled", baskets: student_pref_data.rows});
    }

    let buffer_basket_student_count = await db.Buffer_basket_student.count({
        where: {
            student_id: id
        }
    });

    if(buffer_basket_student_count != 0) {
        let baskets = await fun(id);
        return res.status(200).json({status: "buffer", baskets});
    }

    await sequelize.query(`INSERT INTO buffer_basket_students (student_id, basket_id, basket_name) 
                           SELECT '${id}' as student_id, id, name FROM baskets WHERE stream='${stream}'`);
    // TODO: vikash: remove below commented query, if previous one is working fine.
    // await sequelize.query(`UPDATE buffer_basket_students SET student_id='${id}' 
    //                        WHERE student_id IS NULL`);

    let baskets = await fun(id);
    return res.status(200).json({status: "buffer", baskets});
}


module.exports.fetch_alloted_courses = async (req, res)=> {
    let studentId = req.query.student_id;

    if(!studentId) {
        return res.status(400).json("invalid request!");
    }

    let alloted_course_data = await sequelize.query(`
        select baskets.id as  basket_id, baskets.name as basket_name, running_courses.id as course_id, running_courses.name as course_name
        from course_students
        join running_courses on course_students.course_id=running_courses.id
        join baskets on running_courses.basket_id=baskets.id
        where course_students.student_id='${studentId}';
    `, { type: Sequelize.QueryTypes.SELECT });

    return res.status(200).json(alloted_course_data);
}

module.exports.choose_preferences = (req, res) => {
    let id = req.body.student_id;
    let basketId = req.body.basket_id;
    let p1_id = req.body.p1_id;
    let p1_name = req.body.p1_name;
    let p2_id = req.body.p2_id;
    let p2_name = req.body.p2_name;
    let p3_id = req.body.p3_id;
    let p3_name = req.body.p3_name;
    let p4_id = req.body.p4_id;
    let p4_name = req.body.p4_name;
    let p5_id = req.body.p5_id;
    let p5_name = req.body.p5_name;

    if(!id || !basketId) {
        return res.status(400).json("invalid request!");
    }

    db.Buffer_basket_student.update({
        basket_status: 'opted',
        pref1_course_id: p1_id,
        pref1_course_name: p1_name,
        pref2_course_id: p2_id,
        pref2_course_name: p2_name,
        pref3_course_id: p3_id,
        pref3_course_name: p3_name,
        pref4_course_id: p4_id,
        pref4_course_name: p4_name,
        pref5_course_id: p5_id,
        pref5_course_name: p5_name,
    }, 
    {
        where: {
            student_id: id,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("basket status updated successfully!!");
    }).catch((err)=>{
        console.log("error in updating basket status", err);
        return res.status(400).json("error in updating basket status");
    })
    
}

module.exports.remove_preferences = (req, res) => {
    let id = req.body.student_id;
    let basketId = req.body.basket_id;

    if(!id || !basketId) {
        return res.status(400).json("invalid request!");
    }

    db.Buffer_basket_student.update({
        basket_status: 'non-opted',
        pref1_course_id: null,
        pref1_course_name: null,
        pref2_course_id: null,
        pref2_course_name: null,
        pref3_course_id: null,
        pref3_course_name: null,
        pref4_course_id: null,
        pref4_course_name: null,
        pref5_course_id: null,
        pref5_course_name: null,
    },
    {
        where: {
            student_id: id,
            basket_id: basketId
        }
    }).then(()=>{
        return res.status(200).json("basket status updated successfully!!");
    }).catch((err)=>{
        console.log("error in updating basket status", err);
        return res.status(400).json("error in updating basket status");
    })
}

module.exports.submit_preferences = async (req, res) => {
    let id = req.body.student_id;

    if(!id) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`INSERT INTO student_preferences (student_id,basket_id,basket_name,pref1_course_id,pref1_course_name,
                           pref2_course_id,pref2_course_name,pref3_course_id,pref3_course_name,pref4_course_id,pref4_course_name,pref5_course_id,pref5_course_name)
                           SELECT student_id,basket_id,basket_name,pref1_course_id,pref1_course_name,
                           pref2_course_id,pref2_course_name,pref3_course_id,pref3_course_name,
                           pref4_course_id,pref4_course_name,pref5_course_id,pref5_course_name FROM buffer_basket_students
                           WHERE student_id='${id}'`);
    
    await db.Buffer_basket_student.destroy({
        where: {
            student_id: id
        }
    })
    .then(()=>{
        return res.status(200).json("successfully submitted!!");
    }).catch((err)=>{
        console.log("error in submitting from student",err);
        return res.status(400).json("error in submitting from student");
    })                       
}

module.exports.reset_preferences = async (req, res) => {
    let id = req.query.student_id;

    if(!id) {
        return res.status(400).json("invalid request!");
    }

    db.Student_preference.destroy({
        where: {
            student_id: id
        }
    });

    return res.status(200).json("preference reset successfully");
}