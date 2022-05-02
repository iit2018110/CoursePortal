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

module.exports.get_all_project_detail = async (req, res) => {
    let QueryResult = await sequelize.query(`select project.id as ProjectId
            from project;`, { type: Sequelize.QueryTypes.SELECT });

    let resData = [];

    for (let i = 0; i < QueryResult.length; i++) {
        let projectId = QueryResult[i].ProjectId;

        let projectData = await FetchByProjectId(projectId);
        resData.push(projectData);
    }

    let faculty_data = [];

    let faculty_list = await sequelize.query(`select distinct project.faculty_id as facultyId, faculties.name as facultyName
        from project
        join faculties on project.faculty_id=faculties.id;`,
        {type: Sequelize.QueryTypes.SELECT});

    for (let i = 0; i < faculty_list.length; i++) {
        let faculty = faculty_list[i];
        for (let j = 0; j < resData.length; j++) {
            let project = resData[j];
            if(project.project_faculty===faculty.facultyId) {
                let flag = false;

                for (let k = 0; k < faculty_data.length; k++) {
                    if (faculty_data[k].id === faculty.facultyId) {
                        flag = true;
                        faculty_data[k].projects.push(project);
                        break;
                    }   
                }

                if(!flag) {
                    faculty_data.push({id: faculty.facultyId, name: faculty.facultyName, projects: [project]});
                }
            }
        }
    }

    return res.status(200).json(faculty_data);

}

module.exports.delete_project = async (req, res) => {
    let projectId = req.query.project_id;

    if(!projectId) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`DELETE FROM student_project WHERE project_id='${projectId}';`);
    await sequelize.query(`DELETE FROM project WHERE id='${projectId}';`);

    return res.status(200).json("successfully deleted!");
}

module.exports.reset_project = async (req,res) => {
    await sequelize.query(`truncate table student_project;`)
    await sequelize.query(`truncate table project;`)
    
    return res.status(200).json("successfull reset!");
}