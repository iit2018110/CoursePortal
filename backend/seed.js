const fetch = require('node-fetch');
const db = require('./utils/database/db');

/**
 * Fetching students.
 */
module.exports.fetch_students_from_api_to_db = (req,res) => {
    fetch('http://localhost:3000/student')
    .then(res => res.json())
    .then(async (students)=> {
        for(let i = 0; i < students.length; i++) {
            let student = students[i];
            await db.Student.create(student);
        }
    });

    return res.status(200).json("data successfully inserted");
} 

/**
 * Fetching faculties.
 */
module.exports.fetch_faculties_from_api_to_db = (req,res) => {
    fetch('http://localhost:3000/faculty')
    .then(res => res.json())
    .then(async (faculties)=> {
        for(let i = 0; i < faculties.length; i++) {
            let faculty = faculties[i];
            await db.Faculty.create(faculty);
        }
    });

    return res.status(200).json("data successfully inserted");
} 

/**
 * Fetching course-coordinators.
 */
module.exports.fetch_ccs_from_api_to_db = (req,res) => {
    fetch('http://localhost:3000/cc')
    .then(res => res.json())
    .then(async (ccs)=> {
        for(let i = 0; i < ccs.length; i++) {
            let cc = ccs[i];
            await db.Course_coordinator.create(cc);
        }
    });

    return res.status(200).json("data successfully inserted");
} 

/**
 * Fetching HODs.
 */
module.exports.fetch_hods_from_api_to_db = (req,res) => {
    fetch('http://localhost:3000/hod')
    .then(res => res.json())
    .then(async (hods)=> {
        for(let i = 0; i < hods.length; i++) {
            let hod = hods[i];
            await db.HOD.create(hod);
        }
    });

    return res.status(200).json("data successfully inserted");
} 



