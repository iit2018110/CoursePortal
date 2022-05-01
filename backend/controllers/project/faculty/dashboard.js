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

async function FetchByFacultyId(faculty_id) {
    let QueryResult = await sequelize.query(`select project.id as ProjectId, project.title as ProjectTitle,
    project.faculty_id as FacultyId, project.status as Status
    from project
    where project.faculty_id = '${faculty_id}';`, { type: Sequelize.QueryTypes.SELECT });

    if (QueryResult.length > 0) {
        return { list: QueryResult }
    }

    return {}
}

async function GetFacultyStatus(project_id, faculty_id) {
    let QueryResult = await sequelize.query(`select project.status as FacultyStatus, project.faculty_id as FacultyID
    from project
    where project.id = '${project_id}' AND project.faculty_id = '${faculty_id}';`, { type: Sequelize.QueryTypes.SELECT });
    return QueryResult
}

async function PostProjectStatus(project_id, faculty_id, status) {
    await sequelize.query(`UPDATE project SET status = '${status}'
    WHERE id = '${project_id}' AND  faculty_id = '${faculty_id}';`);
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

module.exports.get_project_by_faculty_id = async (req, res) => {
    if (req.query.hasOwnProperty('faculty_id')) {
        let faculty_id = req.query.faculty_id
        let data = await FetchByFacultyId(faculty_id)
        if ("list" in data) {
            return res.status(200).json({ status: "fetched", data: data });
        }
        return res.status(200).json({ status: "empty", data: data })
    }
    return res.status(400).json("bad request")
}

module.exports.post_status_by_faculty = async (req, res) => {
    let project_id = req.body.project_id;
    let faculty_id = req.body.faculty_id;
    let status = req.body.status;

    if(!project_id || !faculty_id || !status) {
        return res.status(400).json("invalid request!");
    }

    let preStatus = await GetFacultyStatus(project_id, faculty_id)
    if (preStatus.length == 0) {
        return res.status(200).json("No Faculty or Project found")
    }
    else if (preStatus.length == 1) {
        if (preStatus[0].FacultyStatus == pending) {
            if (status == approved) {
                PostProjectStatus(project_id, faculty_id, status)
                return res.status(200).json("success")
            }
            if (status == rejected) {
                PostProjectStatus(project_id, faculty_id, status)
                return res.status(200).json("success")
            }
            let result = "status requested was " + status + " must be assigned to " + approved + " or " + rejected
            return res.status(200).json(result)
        }
        let result = preStatus[0].FacultyID + " is already actioned to " + preStatus[0].FacultyStatus
        return res.status(200).json(result)
    }
    else {
        return res.status(200).json("Internal Issue.")
    }
}

module.exports.get_detail_project = async (req, res) => {
    if (req.query.hasOwnProperty('faculty_id')) {
        let faculty_id = req.query.faculty_id
        let QueryResult = await sequelize.query(`select project.id as ProjectId
            from project
            where project.faculty_id = '${faculty_id}';`, { type: Sequelize.QueryTypes.SELECT });

        let resData = [];

        for (let i = 0; i < QueryResult.length; i++) {
            let projectId = QueryResult[i].ProjectId;

            let projectData = await FetchByProjectId(projectId);
            resData.push(projectData);
        }

        return res.status(200).json(resData);
    }
    return res.status(400).json("bad request")
}