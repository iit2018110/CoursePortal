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
db.Admin = require('../../models/admin');

db.Course.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Basket.hasMany(db.Course, {foreignKey: 'basket_id', sourceKey: 'id' ,onDelete: 'cascade'});
db.Running_course.belongsTo(db.Course, {foreignKey: 'course_id', targetKey: 'id'});
db.Running_course.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Buffer_course_cc.belongsTo(db.Course, {foreignKey: 'course_id', targetKey: 'id'});
db.Buffer_course_cc.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Buffer_basket_hod.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'})
db.Buffer_course_faculty_hod.belongsTo(db.Course, {foreignKey: 'course_id', targetKey: 'id'});
db.Buffer_course_faculty_hod.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Buffer_course_faculty_hod.belongsTo(db.Faculty, {foreignKey: 'faculty_id', targetKey: 'id'});
db.Course_faculty.belongsTo(db.Course, {foreignKey: 'course_id', targetKey: 'id'});
db.Course_faculty.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Course_faculty.belongsTo(db.Faculty, {foreignKey: 'faculty_id', targetKey: 'id'});
db.Buffer_basket_student.belongsTo(db.Student, {foreignKey: 'student_id', targetKey: 'id'});
db.Buffer_basket_student.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});
db.Student_preference.belongsTo(db.Student, {foreignKey: 'student_id', targetKey: 'id'});
db.Student_preference.belongsTo(db.Basket, {foreignKey: 'basket_id', targetKey: 'id'});


module.exports = db;