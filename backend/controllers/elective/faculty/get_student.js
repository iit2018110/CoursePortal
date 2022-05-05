const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");
const { restore_course } = require("../cc/dashboard");

module.exports.fetch_students = async (req,res) => {
    let facultyId = req.query.faculty_id;

    if(!facultyId) {
        return res.status(400).json("invalid request!");
    }

    let course_students_data = await sequelize.query(`
        select running_courses.id as courseId, running_courses.name as courseName, students.id as studentId, students.name as studentName
        FROM course_students
        JOIN course_faculties on course_students.course_id=course_faculties.course_id
        join faculties on faculties.id=course_faculties.faculty_id
        join students on course_students.student_id=students.id
        join running_courses on running_courses.id=course_students.course_id
        where course_faculties.faculty_id='${facultyId}';`, { type: Sequelize.QueryTypes.SELECT });
    
    let course_students = [];
    for (let i = 0; i < course_students_data.length; i++) {
        let courseId = course_students_data[i].courseId;
        let student = {id: course_students_data[i].studentId, name: course_students_data[i].studentName};
        let flag = false;
        for(let j = 0; j < course_students.length; j++) {
            if(courseId===course_students[j].id) {
                flag = true;
                course_students[j].students.push(student);
                break;
            }
        }
        if(!flag)
            course_students.push({id: courseId, name: course_students_data[i].courseName, students: [student]});
    }

    return res.status(200).json(course_students);
}