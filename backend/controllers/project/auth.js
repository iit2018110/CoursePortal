const db = require('../../utils/database/db');
const {get_token} = require('../../utils/jwt-token/jwt');

module.exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let cc = await db.Course_coordinator.findOne({
        where: {
            email: email,
            password: password
        }
    })

    if(cc) {
        let token = get_token('cc', cc.id, cc.email, cc.name);
        return res.status(200).json(token);
    }

    
    let faculty = await db.Faculty.findOne({
        where: {
            email: email,
            password: password
        }
    })

    if(faculty) {
        let token = get_token('faculty', faculty.id, faculty.email, faculty.name);
        return res.status(200).json(token);
    }

    let student = await db.Student.findOne({
        where: {
            email: email,
            password: password
        }
    })

    if(student) {
        let token = get_token('student', student.id, student.email, student.name);
        return res.status(200).json(token);
    }

    return res.status(400).json("Invalid Credentials");
}