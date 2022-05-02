const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function course_faculty_data(stream) {
    let query_result = await sequelize.query(`select baskets.id as basket_id,
    baskets.name as basket_name,running_courses.id as course_id,running_courses.name 
    as course_name,faculties.id as faculty_id,faculties.name as faculty_name, running_courses.total_seats as seats
    from course_faculties
    join baskets on baskets.id=course_faculties.basket_id
    join running_courses on running_courses.id=course_faculties.course_id
    join faculties on faculties.id=course_faculties.faculty_id
    where course_faculties.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for (let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            seats: query_result[i].seats,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };

        for (let j = 0; j < baskets.length; j++) {
            if (query_result[i].basket_id === baskets[j].id) {
                flag = true;
                baskets[j].courses.push(course);
            }
        }

        if (!flag) {
            baskets.push({ id: query_result[i].basket_id, name: query_result[i].basket_name, courses: [course] })
        }

    }

    return baskets;
}

async function buffer_course_faculty_hod_data(stream) {
    let query_result = await sequelize.query(`select buffer_course_faculty_hod.basket_id as basket_id, 
        buffer_course_faculty_hod.basket_name as basket_name, buffer_course_faculty_hod.basket_status as basket_status, buffer_course_faculty_hod.seats as seats,
        running_courses.id as course_id, running_courses.name as course_name, faculties.id as faculty_id, faculties.name as faculty_name
        from buffer_course_faculty_hod
        join running_courses
        on running_courses.id=buffer_course_faculty_hod.course_id
        left outer join faculties
        on faculties.id=buffer_course_faculty_hod.faculty_id
        where buffer_course_faculty_hod.stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    let baskets = [];

    for (let i = 0; i < query_result.length; i++) {
        let flag = false;
        let course = {
            id: query_result[i].course_id,
            name: query_result[i].course_name,
            seats: query_result[i].seats,
            faculty: {
                id: query_result[i].faculty_id,
                name: query_result[i].faculty_name
            }
        };

        for (let j = 0; j < baskets.length; j++) {
            if (query_result[i].basket_id === baskets[j].id) {
                flag = true;
                baskets[j].courses.push(course);
            }
        }

        if (!flag) {
            baskets.push({ id: query_result[i].basket_id, name: query_result[i].basket_name, status: query_result[i].basket_status, courses: [course] })
        }

    }

    return baskets;
}

/* First of all it will try to fetch and return from course-faculty table (as if HOD already submitted assigned faculties)
   then it will try to fetch and return from buffer_course_faculty_hod table and
   if it's empty then will insert courses from running course.
*/

module.exports.fetch_baskets = async (req, res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    const course_faculty = await db.Course_faculty.findAndCountAll({
        where: {
            stream: stream
        }
    })

    if (course_faculty.count != 0) {
        let data = await course_faculty_data(stream);
        return res.status(200).json({ status: "selected", data: data });
    }

    const buffer_course_faculty_hod_count = await db.Buffer_course_faculty_hod.count({
        where: {
            stream: stream
        }
    })

    if (buffer_course_faculty_hod_count != 0) {
        let data = await buffer_course_faculty_hod_data(stream);
        return res.status(200).json({ status: "buffer", data: data });
    }

    // fill buffer_course_faculty_hod
    await sequelize.query(`INSERT INTO buffer_course_faculty_hod (basket_id,basket_name,
        course_id,stream) select baskets.id as basketId, baskets.name as basketName, running_courses.id as courseId, '${stream}' as stream
        from running_courses
        join baskets on baskets.id=running_courses.basket_id
        where running_courses.stream='${stream}';`);

    let data = await buffer_course_faculty_hod_data(stream);
    return res.status(200).json({ status: "buffer", data: data });
}

module.exports.fetch_faculties = async (req, res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    let query_result = await sequelize.query(`select running_courses.id as course_id, faculty_preferences.faculty_id as id,faculties.name
    from running_courses
    left outer join faculty_preferences
    on running_courses.id=faculty_preferences.course_id
    join faculties
    on faculty_preferences.faculty_id=faculties.id
    where running_courses.stream='${stream}'
    order by faculty_preferences.preference_value, faculty_preferences.updatedAt;
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
        await db.Buffer_course_faculty_hod.update({
            basket_status: 'assigned',
            faculty_id: data[i].faculty_id,
            seats: data[i].seats ? data[i].seats : 60
        }, {
            where: {
                course_id: data[i].course_id
            }
        })
    }

    return res.status(200).json("data updated successfully!!");
}

module.exports.unassign_courses = async (req, res) => {
    let basketId = req.body.basket_id;

    if(!basketId) {
        return res.status(400).json("invalid request!");
    }

    await db.Buffer_course_faculty_hod.update({
        basket_status: 'un-assigned',
        faculty_id: null,
        seats: 60
    }, {
        where: {
            basket_id: basketId
        }
    })

    return res.status(200).json("data updated successfully!!");
}

module.exports.submit_assigned_courses = async (req,res) => {
    let stream = req.body.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`INSERT INTO course_faculties (course_id, faculty_id, basket_id, stream)
                           SELECT course_id, faculty_id, basket_id, stream FROM buffer_course_faculty_hod
                           WHERE stream='${stream}' AND basket_status='assigned'`);

    await sequelize.query(`UPDATE running_courses 
    SET running_courses.total_seats=(SELECT seats FROM buffer_course_faculty_hod
    WHERE running_courses.id=buffer_course_faculty_hod.course_id AND buffer_course_faculty_hod.stream='${stream}' AND buffer_course_faculty_hod.basket_status='assigned');`);                       
    
    await sequelize.query(`UPDATE running_courses 
    SET running_courses.available_seats=(SELECT seats FROM buffer_course_faculty_hod
    WHERE running_courses.id=buffer_course_faculty_hod.course_id AND buffer_course_faculty_hod.stream='${stream}' AND buffer_course_faculty_hod.basket_status='assigned');`);

    await sequelize.query(`DELETE FROM buffer_course_faculty_hod WHERE stream='${stream}'`);

    return res.status(200).json("submitted successfully!!");
}

module.exports.reset_assigned_courses = async (req,res) => {
    let stream = req.query.stream;

    if(!stream) {
        return res.status(400).json("invalid request!");
    }

    await sequelize.query(`DELETE FROM course_faculties WHERE stream='${stream}'`); 
                           
    return res.status(200).json("reset successfully!!");
}