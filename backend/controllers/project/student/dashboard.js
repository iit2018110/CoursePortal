const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

const approved = "approved"
const rejected = "rejected"

async function FetchByProjectId(id) {
    let QueryResultProject = await sequelize.query(`select project.id as ProjectId, project.title as ProjectTitle,
    project.faculty_id as FacultyId, project.status as Status
    from project
    where project.id = '${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let QueryResultStudentProject = await sequelize.query(`select student_project.Student_id as StudentId, student_project.status as StudentStatus
    from student_project
    where student_project.project_id = '${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let Students = []
    
    for(let i = 0; i < QueryResultStudentProject.length; i++) {
        Students.push({student_id: QueryResultStudentProject[i].StudentId, student_status: QueryResultStudentProject[i].StudentStatus})
    }

    let GetResult = []
    // console.log(typeof({project_id: QueryResultProject.ProjectId, project_title: QueryResultProject.ProjectTitle,
    //     project_faculty: QueryResultProject.FacultyId, project_status: QueryResultProject.Status,
    //     students: Students}))
    GetResult.push({project_id: QueryResultProject.ProjectId, project_title: QueryResultProject.ProjectTitle,
    project_faculty: QueryResultProject.FacultyId, project_status: QueryResultProject.Status,
    students: Students})

    return GetResult
}

module.exports.get_project_by_project_id = async (req, res)=> {
    let id = req.query.id
    let data = await FetchByProjectId(id)
    // console.log(typeof(data))
    if(Object.keys(data).length===1){
        return res.status(200).json({status: "Empty"});
    }
    else{
        return res.status(200).json({status: "fetched", data: data}); 
    }
}

async function PostProjectFacultyID(title, faculty_id) {
    await sequelize.query(`INSERT INTO project (title, faculty_id)
    VALUES ('${title}, '${faculty_id}');`);
    let project_id = await sequelize.query(`select max(id) from project;`, { type: Sequelize.QueryTypes.SELECT });
    return project_id
}

async function PostStudentProjectStudentIDStatus(project_id, Student_id, status) {
    await sequelize.query(`INSERT INTO Student_project (project_id, Student_id, status)
    VALUES ('${project_id}', '${Student_id}', '${status}');`);
}

async function PostStudentProjectStudentID(project_id, Student_id) {
    await sequelize.query(`INSERT INTO Student_project (project_id, Student_id)
    VALUES ('${project_id}', '${Student_id}');`);
}

module.exports.post_project_by_student = async (req, res)=> {
    // let data = req.body
    // if (data.hasownproperty("title")===true && data.hasownproperty("faculty_id")===true && data.hasownproperty("student_posted_id")===true &&
    // data.hasownproperty("students")===true) {
        let title = req.body.title
        let faculty_id = req.body.faculty_id
        let project_id = PostProjectFacultyID(title, faculty_id)
        // let student_posted_id = req.body.student_posted_id
        // PostStudentProjectStudentIDStatus(project_id, student_posted_id, approved)
        // let students = req.body.students
        // for(let i = 0; i < students.length; i++) {
        //     let student_id = students.student_id
        //     PostStudentProjectStudentID(project_id, student_id)
        // }
        return res.status(200).json("success");
    // }
    // else{
    //     return res.status(200).json({status: "Invalid request"});
    // }
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