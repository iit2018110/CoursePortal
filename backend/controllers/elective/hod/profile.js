const db = require('../../../utils/database/db');

module.exports.profile = (req,res) => {
    let id = req.query.id;

    if(!id) {
        return res.status(400).json("invalid request");
    }

    db.HOD.findOne({
        where: {
            id: id
        }
    }).then((user)=>{
        return res.status(200).json({stream: user.stream});
    }).catch((err)=>{
        console.log("error in profile of course-coordinator", err);
        return res.status(400).json("Error in profile of course-coordinator");
    });
};