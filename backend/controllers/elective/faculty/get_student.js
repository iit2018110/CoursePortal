const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");
const { restore_course } = require("../cc/dashboard");

module.exports.get_student = (req,res) => {
    return res.json("hi there");
}