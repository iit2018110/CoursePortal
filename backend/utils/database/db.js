const db = {};

db.Student = require('../../models/student').Student;
db.Buffer_basket_student = require('../../models/student').Buffer_basket_student;

db.Faculty = require('../../models/faculty');

db.HOD = require('../../models/hod').HOD;
db.Buffer_basket_hod = require('../../models/hod').Buffer_basket_hod;
db.Buffer_course_faculty_hod = require('../../models/hod').Buffer_course_faculty_hod;

db.Course_coordinator = require('../../models/course_coordinator').Course_coordinator;
db.Buffer_course_cc = require('../../models/course_coordinator').Buffer_course_cc;

db.Basket = require('../../models/basket');

db.Course = require('../../models/course').Course;
db.Running_course = require('../../models/course').Running_course;

db.Course_faculty = require('../../models/course_faculty');

db.Student_preference = require('../../models/student_preference');



module.exports = db;
