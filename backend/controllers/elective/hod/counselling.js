const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function get_baskets_data(stream) {
    let data = await sequelize.query(`select baskets.id as basket_id, baskets.name as basket_name, running_courses.id as course_id,
        running_courses.name as course_name, students.id as student_id, students.name as student_name
        from student_preferences 
        join baskets on baskets.id=student_preferences.basket_id
        join running_courses on running_courses.id=student_preferences.pref1_course_id or running_courses.id=student_preferences.pref2_course_id or running_courses.id=student_preferences.pref3_course_id
        join students on students.id=student_preferences.student_id
        where running_courses.stream='${stream}'
        order by students.gpa desc;`, { type: Sequelize.QueryTypes.SELECT });

    let basket_students = [];
    for (let i = 0; i < data.length; i++) {
        let flag = false;
        let basketId = data[i].basket_id;

        let student = { id: data[i].student_id, name: data[i].student_name };
        let course = { id: data[i].course_id, name: data[i].course_name, students: [student] };

        for (let j = 0; j < basket_students.length; j++) {
            if (basket_students[j].id === basketId) {
                flag = true;
                let flag1 = false;
                for (let k = 0; k < basket_students[j].courses.length; k++) {
                    if (basket_students[j].courses[k].id === data[i].course_id) {
                        basket_students[j].courses[k].students.push(student);
                        flag1 = true;
                        break;
                    }
                }
                if (!flag1) {
                    basket_students[j].courses.push(course);
                }
            }
        }

        if (!flag) {
            basket_students.push({ id: basketId, name: data[i].basket_name, courses: [course] })
        }
    }

    return basket_students;
}

async function get_student_preferences_data(stream) {
    let data = await sequelize.query(`
    SELECT 
        students.id AS student_id,
        baskets.id AS basket_id,
        student_preferences.pref1_course_id as pref1,
        student_preferences.pref2_course_id as pref2,
        student_preferences.pref3_course_id as pref3
    FROM
        student_preferences
            JOIN
        students ON student_preferences.student_id = students.id
            JOIN
        baskets ON student_preferences.basket_id = baskets.id
    WHERE
        students.stream = '${stream}'
    ORDER BY students.gpa DESC;`, { type: Sequelize.QueryTypes.SELECT });

    return data;
}

async function get_available_seats_data(stream) {
    let data = sequelize.query(`SELECT id,available_seats from running_courses
        WHERE stream='${stream}';`, { type: Sequelize.QueryTypes.SELECT });

    return data;
}

module.exports.fetch_basket_preferences = async (req, res) => {
    let stream = req.query.stream;

    let data = await get_baskets_data(stream);
    return res.status(200).json(data);
}

module.exports.students_counselling = async (req, res) => {
    let stream = req.body.stream;

    let student_preferences_data = await get_student_preferences_data(stream);

    /**
     * Getting student preferences for each baskets.
     */
    let student_preferences = [];
    for (let i = 0; i < student_preferences_data.length; i++) {
        let studentId = student_preferences_data[i].student_id;
        let basketId = student_preferences_data[i].basket_id;
        let basket = { id: basketId, pref1: student_preferences_data[i].pref1, pref2: student_preferences_data[i].pref2, pref3: student_preferences_data[i].pref3 };

        let flag = false;
        for (let j = 0; j < student_preferences.length; j++) {
            if (student_preferences[j].id === studentId) {
                flag = true;
                student_preferences[j].baskets.push(basket);
                break;
            }
        }

        if (!flag) {
            student_preferences.push({ id: studentId, baskets: [basket] });
        }
    }

    /**
     * Getting availble seats for each courses.
     */
    let available_seats_data = await get_available_seats_data(stream);

    let seats_available = {};
    for (let i = 0; i < available_seats_data.length; i++) {
        let id = available_seats_data[i].id;
        let seats = available_seats_data[i].available_seats;

        seats_available[id] = seats;
    }

    let unalloted_students = {};

    /**
     * Counselling logic.
     */
    let course_students = {};
    for (let i = 0; i < student_preferences.length; i++) {
        let studentId = student_preferences[i].id;

        for (let j = 0; j < student_preferences[i].baskets.length; j++) {
            let basketId = student_preferences[i].baskets[j].id;
            let pref1 = student_preferences[i].baskets[j].pref1;
            let pref2 = student_preferences[i].baskets[j].pref1;
            let pref3 = student_preferences[i].baskets[j].pref1;

            let flag = false;

            if (seats_available[pref1] > 0) {
                if (course_students[pref1]) {
                    course_students[pref1].push(studentId);
                } else {
                    course_students[pref1] = [studentId];
                }

                seats_available[pref1]--;
                flag = true;
            }
            else if (seats_available[pref2] > 0) {
                if (course_students[pref2]) {
                    course_students[pref2].push(studentId);
                } else {
                    course_students[pref2] = [studentId];
                }

                seats_available[pref2]--;
                flag = true;
            }
            else if (seats_available[pref3] > 0) {
                if (course_students[pref3]) {
                    course_students[pref3].push(studentId);
                } else {
                    course_students[pref3] = [studentId];
                }

                seats_available[pref3]--;
                flag = true;
            }

            if(!flag) {
                if(unalloted_students[basketId]) {
                    unalloted_students[basketId].push(studentId);
                } else {
                    unalloted_students[basketId] = [studentId];
                }
            }
        }
    }

    

    return res.status(200).json(course_students);
}
