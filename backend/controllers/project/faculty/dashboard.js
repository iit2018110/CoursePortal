const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

const approved = "approved"
const rejected = "rejected"

module.exports.get_project_by_project_id = async (req, res)=> {
    let id = req.query.id
    let data = await FetchByProjectId(id)
    if("project_id" in data){
        return res.status(200).json({status: "fetched", data: data});
    }
    return res.status(200).json({status:"empty", data: data})
}

// project_id must integer and student_id and status must be string
module.exports.post_status_by_faculty = async (req, res)=> {
    // let project_id = req.body.project_id
    // let faculty_id = req.body.faculty_id
    // let status = req.body.status
    // let title = req.body.title
    // console.log(project_id)
    // if(status==approved){
    //     PostProjectStatus(project_id,title,faculty_id,status)
    //    return res.status(200).json("success");
    // }
    // if(status==rejected){
    //     PostProjectStatus(project_id,title,faculty_id,status)
    //     return res.status(200).json("success");
    // }
    return res.status(400).json("bad request");
}

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

    if(QueryResultProject.length>0){
        return {project_id: QueryResultProject[0].ProjectId, project_title: QueryResultProject[0].ProjectTitle,
        project_faculty: QueryResultProject[0].FacultyId, project_status: QueryResultProject[0].Status,
        students: Students}
    }

    return {}
}

async function  PostProjectStatus(project_id,title,faculty_id,status) {
    await sequelize.query(`UPDATE project SET status = '${status}'
    WHERE project_id = '${project_id}' AND  faculty_id = '${faculty_id} AND  title = '${title}';`);
}