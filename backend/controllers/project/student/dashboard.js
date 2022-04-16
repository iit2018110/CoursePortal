const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function FetchByProjectId(id) {
    let QueryResult = await sequelize.query(`select Project.id as ProjectId, Project.title as ProjectTitle,
    Project.faculty_id as FacultyId, Project.status as Status,
    Student_project.Student_id as StudentId, Student_project.status as StudentStatus
    from project join student_project
    on Project.id = Student_project.project_id
    where Project.id = '${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let Students = []
    
    for(let i = 0; i < query_result.length; i++) {
        Students.push({student_id: query_result[i].StudentId, student_status: query_result[i].StudentStatus})
    }

    let GetResult = []

    if(query_result.length > 0){
        GetResult.push({project_id: query_result[0].ProjectId, project_title: query_result[0].ProjectTitle,
        project_faculty: query_result[0].FacultyId, project_status: query_result[0].Status,
        students: Students})
    }

    return GetResult
}
module.exports.get_project_by_project_id = async (req, res)=> {
    let id = req.query.id
    let data = await FetchByProjectId(id)
    console.log("id: ${id}")
    return res.status(200).json({status: "non-filled", data: data});
}
// async function fun(id) {
//     let query_result = await sequelize.query(`select buffer_basket_students.basket_id as basket_id, 
//         buffer_basket_students.basket_name as basket_name, buffer_basket_students.basket_status as basket_status,
//         buffer_basket_students.pref1_course_id as pref1_course_id, buffer_basket_students.pref1_course_name as pref1_course_name,
//         buffer_basket_students.pref2_course_id as pref2_course_id, buffer_basket_students.pref2_course_name as pref2_course_name,
//         buffer_basket_students.pref3_course_id as pref3_course_id, buffer_basket_students.pref3_course_name as pref3_course_name,
//         running_courses.id as course_id, running_courses.name as course_name, faculties.id as faculty_id, faculties.name as faculty_name
//         from buffer_basket_students
//         join course_faculties
//         on course_faculties.basket_id=buffer_basket_students.basket_id
//         join running_courses
//         on running_courses.id=course_faculties.course_id
//         join faculties
//         on faculties.id=course_faculties.faculty_id
//         where buffer_basket_students.student_id='${id}';`, { type: Sequelize.QueryTypes.SELECT });

//     let baskets = [];

//     for(let i = 0; i < query_result.length; i++) {
//         let flag = false;
//         let course = {id: query_result[i].course_id, name: query_result[i].course_name, faculty: {id: query_result[i].faculty_id, name: query_result[i].faculty_name}};

//         for(let j = 0; j < baskets.length; j++) {
//             if(query_result[i].basket_id === baskets[j].id) {
//                 flag = true;
//                 baskets[j].courses.push(course);
//             }
//         }

//         if(!flag) {
//             baskets.push({id: query_result[i].basket_id, name: query_result[i].basket_name, status: query_result[i].basket_status, 
//                 pref1_course_id:query_result[i].pref1_course_id, pref1_course_name: query_result[i].pref1_course_name,
//                 pref2_course_id:query_result[i].pref2_course_id, pref2_course_name: query_result[i].pref2_course_name,
//                 pref3_course_id:query_result[i].pref3_course_id, pref3_course_name: query_result[i].pref3_course_name,   
//                 courses: [course]})
//         }
        
//     }

//     return baskets;
// }

// module.exports.get_dashboard = async (req, res)=> {
//     let id = req.query.student_id;
//     let stream = req.query.stream;

//     let student_pref_data =  await db.Student_preference.findAndCountAll({
//         attributes: [['basket_id', 'id'],['basket_name', 'name'],'pref1_course_id','pref1_course_name',
//             'pref2_course_id','pref2_course_name','pref3_course_id','pref3_course_name'],
//         where: {
//             student_id: id
//         }
//     });

//     if(student_pref_data.count != 0) {
//         return res.status(200).json({status: "filled", baskets: student_pref_data.rows});
//     }

//     let buffer_basket_student_count = await db.Buffer_basket_student.count({
//         where: {
//             student_id: id
//         }
//     });

//     if(buffer_basket_student_count != 0) {
//         let baskets = await fun(id);
//         return res.status(200).json({status: "buffer", baskets});
//     }

//     await sequelize.query(`INSERT INTO buffer_basket_students (basket_id, basket_name) 
//                            SELECT id, name FROM baskets WHERE stream='${stream}'`);

//     await sequelize.query(`UPDATE buffer_basket_students SET student_id='${id}' 
//                            WHERE student_id IS NULL`);

//     let baskets = await fun(id);
//     return res.status(200).json({status: "buffer", baskets});
// }