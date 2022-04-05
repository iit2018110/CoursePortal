const sequelize = require("../../../utils/database/config");
const db = require("../../../utils/database/db");

async function course_faculty_data(stream) {

}

async function buffer_baskets_hod_data(stream) {

}

module.exports.fetch_baskets = async (req,res) => {
    let stream  = req.query.stream;

    const course_faculty = await db.Faculty_preference.findAndCountAll({
        where: {
            stream: stream        
        }
    })

    if(course_faculty.count != 0) {
        let data = await course_faculty_data(stream);
        return res.status(200).json({status: "selected", data: data});
    }
    
    const buffer_baskets_hod_count = await db.Buffer_basket_hod.count({
        where: {
            stream: stream
        }
    })
    
    if(buffer_baskets_hod_count != 0) {
        let data = await buffer_baskets_hod_data(stream);
        return res.status(200).json({status: "buffer", data: data});
    }

    // fill buffer_basket_hod
    await sequelize.query('');
}