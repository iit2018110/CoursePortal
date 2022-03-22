const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

module.exports.fetch_subjects = (req,res) => {
    const stream = req.query.stream;
    db.Basket.findAll({
        attributes: ['id', 'name'],
        where: {
            stream: stream
        },
        include: [{
            model: db.Course,
            attributes: ['id', 'name'],
            required: false
        }]
    }).then(async(data)=>{
        console.log("data", data);
        return res.status(200).json(data);
    }).catch((err) => {
        console.log("err in fetching from it basket", err);
    })
}