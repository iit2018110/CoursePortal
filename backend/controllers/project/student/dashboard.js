const { query } = require('express');
const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

const approved = "approved"
const rejected = "rejected"
const pending = "pending"

async function FetchByProjectId(id) {
    let QueryResultProject = await sequelize.query(`select project.id as ProjectId, project.title as ProjectTitle,
    project.faculty_id as FacultyId, faculties.name as facultyName, project.status as Status
    from project
    join faculties on faculties.id=project.faculty_id
    where project.id = '${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let QueryResultStudentProject = await sequelize.query(`select student_project.Student_id as StudentId, student_project.status as StudentStatus
    from student_project
    where student_project.project_id = '${id}';`, { type: Sequelize.QueryTypes.SELECT });

    let Students = []

    for (let i = 0; i < QueryResultStudentProject.length; i++) {
        Students.push({ student_id: QueryResultStudentProject[i].StudentId, student_status: QueryResultStudentProject[i].StudentStatus })
    }

    if (QueryResultProject.length > 0) {
        return {
            project_id: QueryResultProject[0].ProjectId, project_title: QueryResultProject[0].ProjectTitle,
            project_faculty: QueryResultProject[0].FacultyId, faculty_name: QueryResultProject[0].facultyName, project_status: QueryResultProject[0].Status,
            students: Students
        }
    }

    return {}
}

async function FetchByProjectStudentID(Student_id) {
    let QueryResult = await sequelize.query(`select student_project.project_id as StudentProjectID,
    student_project.Student_id as StudentID, student_project.status as StudentStatus
    from student_project
    where student_project.Student_id = '${Student_id}';`,
        { type: Sequelize.QueryTypes.SELECT });

    if (QueryResult.length > 0) {
        return { list: QueryResult };
    }

    return {}
}

async function GetStudentStatus(project_id, Student_id) {
    let QueryResultStudentProject = await sequelize.query(`select student_project.status as StudentStatus, student_project.Student_id as StudentID
    from student_project
    where student_project.project_id = '${project_id}' AND student_project.Student_id = '${Student_id}';`, { type: Sequelize.QueryTypes.SELECT });
    return QueryResultStudentProject
}

async function IsStudentNotAvailable(Student_id) {
    let QueryResult = await sequelize.query(`select student_project.status as StudentStatus, student_project.Student_id as StudentID
    from student_project
    where student_project.Student_id = '${Student_id}' AND student_project.status = 'approved';`, { type: Sequelize.QueryTypes.SELECT });
    if (QueryResult.length > 0) {
        return true
    }
    return false;
}

async function PostProjectFacultyID(title, faculty_id) {
    await sequelize.query(`INSERT INTO project (title, faculty_id) VALUES('${title}', '${faculty_id}');`);
    let project_id = await sequelize.query(`select max(id) as max_id from project;`, { type: Sequelize.QueryTypes.SELECT });
    return project_id[0].max_id
}

async function PostStudentProjectStudentIDStatus(project_id, Student_id, status) {
    await sequelize.query(`INSERT INTO student_project (project_id, Student_id, status)
    VALUES ('${project_id}', '${Student_id}', '${status}');`);
}

async function PostStudentProjectStudentID(project_id, Student_id) {
    await sequelize.query(`INSERT INTO student_project (project_id, Student_id)
    VALUES ('${project_id}', '${Student_id}');`);
}

async function PostStudentProjectStatus(project_id, Student_id, status) {
    await sequelize.query(`UPDATE student_project SET status = '${status}'
    WHERE project_id = '${project_id}' AND  Student_id = '${Student_id}';`);
}

module.exports.get_faculty_list = async (req, res) => {
    let data = await db.Faculty.findAll({
        attributes: ['id', 'name']
    })
    return res.status(200).json(data);
}

module.exports.get_project_by_project_id = async (req, res) => {
    if (req.query.hasOwnProperty('id')) {
        let id = req.query.id
        let data = await FetchByProjectId(id)
        if ("project_id" in data) {
            return res.status(200).json({ status: "fetched", data: data });
        }
        return res.status(200).json({ status: "empty", data: data })
    }
    return res.status(400).json("bad request")
}

module.exports.get_project_by_student_id = async (req, res) => {
    if (req.query.hasOwnProperty('student_id')) {
        let student_id = req.query.student_id
        let data = await FetchByProjectStudentID(student_id)
        if ("list" in data) {
            return res.status(200).json({ status: "fetched", data: data });
        }
        return res.status(200).json({ status: "empty", data: data })
    }
    return res.status(400).json("bad request")
}

module.exports.post_project_by_student = async (req, res) => {

    if (!("title" in req.body) || !("faculty_id" in req.body) ||
        !("student_posted_id" in req.body) || !("students" in req.body)) {
        return res.status(400).json("bad request")
    }
    let title = req.body.title
    let faculty_id = req.body.faculty_id
    let student_posted_id = req.body.student_posted_id
    if (await IsStudentNotAvailable(student_posted_id) == true) {
        return res.status(200).json("Already approved in other project")
    }
    let project_id = await PostProjectFacultyID(title, faculty_id)
    await PostStudentProjectStudentIDStatus(project_id, student_posted_id, approved)
    let students = req.body.students
    for (let i = 0; i < students.length; i++) {
        let student_id = students[i].student_id
        await PostStudentProjectStudentID(project_id, student_id)
    }
    return res.status(200).json("success")
}

// project_id must integer and student_id and status must be string
module.exports.post_status_by_student = async (req, res) => {
    let project_id = req.body.project_id
    let student_id = req.body.student_id
    let status = req.body.status

    if(!project_id || !student_id || !status) {
        return res.status(400).json("invalid request!");
    }

    if (await IsStudentNotAvailable(student_id) == true) {
        return res.status(200).json("Already approved in other project")
    }
    let preStatus = await GetStudentStatus(project_id, student_id)
    if (preStatus.length == 0) {
        return res.status(200).json("No student or project found")
    }
    else if (preStatus.length == 1) {
        if (preStatus[0].StudentStatus == pending) {
            if (status == approved) {
                PostStudentProjectStatus(project_id, student_id, status)
                return res.status(200).json("success")
            }
            if (status == rejected) {
                PostStudentProjectStatus(project_id, student_id, status)
                return res.status(200).json("success")
            }
            let result = "status requested was " + status + " must be assigned to " + approved + " or " + rejected
            return res.status(200).json(result)
        }
        let result = preStatus[0].StudentID + " is already actioned to " + preStatus[0].StudentStatus
        return res.status(200).json(result)
    }
    else {
        return res.status(200).json("Internal Issue.")
    }
}

module.exports.get_detail_project = async (req, res) => {
    if (req.query.hasOwnProperty('student_id')) {
        let Student_id = req.query.student_id;
        let QueryResult = await sequelize.query(`select student_project.project_id as StudentProjectID
                from student_project where student_project.Student_id = '${Student_id}';`,
            { type: Sequelize.QueryTypes.SELECT });

        let resData = [];

        for (let i = 0; i < QueryResult.length; i++) {
            let projectId = QueryResult[i].StudentProjectID;
            
            let projectData = await FetchByProjectId(projectId);
            resData.push(projectData);
        }

        return res.status(200).json(resData);
    }
    return res.status(400).json("bad request")
}