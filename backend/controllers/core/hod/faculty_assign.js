const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function course_faculty_data(stream) {
    let query_result = await sequelize.query(`select core_courses.semester as semester,core_courses.id as course_id, core_courses.name as course_name, faculties.id as faculty_id,
    faculties.name as faculty_name
    from core_course_faculties
    join core_courses on core_courses.id=core_course_faculties.course_id
    join faculties on faculties.id=core_course_faculties.faculty_id
    where core_courses.stream='${stream}'
    order by core_courses.semester;`, { type: Sequelize.QueryTypes.SELECT });

    let sem_courses = [];

    for (let i = 0; i < query_result.length; i++) {
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };
        
        let flag = false;
        for (let j = 0; j < sem_courses.length; j++) {
            if (query_result[i].semester === sem_courses[j].semester) {
                flag = true;
                sem_courses[j].courses.push(course);
            }
        }

        if (!flag) {
            sem_courses.push({ semester: query_result[i].semester, courses: [course] })
        }

    }

    return sem_courses;
}

async function buffer_course_faculty_hod_data(stream,mod) {
    let query_result = await sequelize.query(`select core_courses.semester as semester, buffer_core_course_faculty_hod.sem_status as sem_status, core_courses.id as course_id, core_courses.name as course_name, faculties.id as faculty_id, faculties.name as faculty_name
    from buffer_core_course_faculty_hod
    join core_courses on core_courses.id=buffer_core_course_faculty_hod.course_id
    left join faculties on faculties.id=buffer_core_course_faculty_hod.faculty_id
    where core_courses.stream='${stream}' AND mod(core_courses.semester,2)='${mod}' 
    order by core_courses.semester;`, { type: Sequelize.QueryTypes.SELECT });

    let sem_courses = [];

    for (let i = 0; i < query_result.length; i++) {
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };
        
        let flag = false;
        for (let j = 0; j < sem_courses.length; j++) {
            if (query_result[i].semester === sem_courses[j].semester) {
                flag = true;
                sem_courses[j].courses.push(course);
            }
        }

        if (!flag) {
            sem_courses.push({ semester: query_result[i].semester, sem_status: query_result[i].sem_status, courses: [course] })
        }

    }

    return sem_courses;
}

/* First of all it will try to fetch and return from course-faculty table (as if HOD already submitted assigned faculties)
   then it will try to fetch and return from buffer_course_faculty_hod table and
   if it's empty then will insert courses from running course.
*/

module.exports.fetch_courses = async (req, res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    const course_faculty = await db.Core_course_faculty.findAndCountAll({
        where: {
            stream: stream
        }
    })

    if (course_faculty.count != 0) {
        let data = await course_faculty_data(stream);
        return res.status(200).json({ status: "selected", data: data });
    }
    
    let semType = await db.Params.findOne({
        attributes: ['value'],
        where: {
            key: 'sem_type'
        }
    })

    semType = semType.value;
    let mod;

    if (semType === 'even') {
        mod = 0;
    } else {
        mod = 1;
    }

    const buffer_course_faculty_hod_count = await db.Buffer_core_course_faculty_hod.count({
        where: {
            stream: stream
        }
    })

    if (buffer_course_faculty_hod_count != 0) {
        let data = await buffer_course_faculty_hod_data(stream,mod);
        return res.status(200).json({ status: "buffer", data: data });
    }

    // fill buffer_core_course_faculty_hod
    await sequelize.query(`INSERT INTO buffer_core_course_faculty_hod (semester,course_id,
        stream) select semester as semester, id as courseId, '${stream}' as stream
        from core_courses
        where stream='${stream}';`);

    let data = await buffer_course_faculty_hod_data(stream);
    return res.status(200).json({ status: "buffer", data: data });
}

module.exports.fetch_faculties = async (req, res) => {
    let stream = req.query.stream;

    if(!stream){
        return res.status(400).json("invalid request!");
    }

    let query_result = await sequelize.query(`select core_courses.id as course_id, core_faculty_preferences.faculty_id as id,faculties.name as name
    from core_courses
    left outer join core_faculty_preferences
    on core_courses.id=core_faculty_preferences.course_id
    join faculties
    on core_faculty_preferences.faculty_id=faculties.id
    where core_courses.stream='${stream}'
    order by core_faculty_preferences.preference_value, core_faculty_preferences.updatedAt;
    `, { type: Sequelize.QueryTypes.SELECT });

    let data = [];

    for (let i = 0; i < query_result.length; i++) {
        let courseId = query_result[i].course_id;

        let flag = false;
        for (let j = 0; j < data.length; j++) {
            if (data[j].course_id === courseId) {
                data[j].faculties.push({ id: query_result[i].id, name: query_result[i].name });
                flag = true;
            }
        }

        if (!flag) {
            data.push({ course_id: courseId, faculties: [{ id: query_result[i].id, name: query_result[i].name }] });
        }
    }


    return res.status(200).json(data);
}

module.exports.assign_courses = async (req, res) => {
    let data = req.body.data;

    if(!data) {
        return res.status(400).json("invalid request!");
    }

    for (let i = 0; i < data.length; i++) {
        await db.Buffer_core_course_faculty_hod.update({
            sem_status: 'assigned',
            faculty_id: data[i].faculty_id,
        }, {
            where: {
                course_id: data[i].course_id
            }
        })
    }

    return res.status(200).json("data updated successfully!!");
}

module.exports.unassign_courses = async (req, res) => {
    let semester = req.body.semester;

    if(!semester) {
        return res.status(400).json("invalid request!");
    }

    await db.Buffer_core_course_faculty_hod.update({
        sem_status: 'un-assigned',
        faculty_id: null,
    }, {
        where: {
            semester: semester
        }
    })

    return res.status(200).json("data updated successfully!!");
}

module.exports.submit_assigned_courses = async (req,res) => {
    let stream = req.body.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`INSERT INTO core_course_faculties (course_id, faculty_id, semester, stream)
                           SELECT course_id, faculty_id, semester, stream FROM buffer_core_course_faculty_hod
                           WHERE stream='${stream}' AND sem_status='assigned'`);

                      
    await sequelize.query(`DELETE FROM buffer_core_course_faculty_hod WHERE stream='${stream}'`);

    return res.status(200).json("submitted successfully!!");
}

module.exports.reset_assigned_courses = async (req,res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`DELETE FROM core_course_faculties WHERE stream='${stream}'`); 
                           
    return res.status(200).json("reset successfully!!");
}