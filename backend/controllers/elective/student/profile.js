const db = require('../../../utils/database/db');

module.exports.profile = (req,res) => {
    let id = req.query.id;

    db.Student.findOne({
        where: {
            id: id
        }
    }).then((user)=>{
        return res.status(200).json({stream: user.stream});
    }).catch((err)=>{
        console.log("error in profile of student", err);
        return res.status(400).json("Error in profile of student");
    });
};