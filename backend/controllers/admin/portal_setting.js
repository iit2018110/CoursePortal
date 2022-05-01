const Sequelize = require('sequelize');
const sequelize = require("../../utils/database/config");
const db = require('../../utils/database/db');

module.exports.set_portal_timing = async (req, res) => {
    let userType = req.body.user_type;
    let startTime = req.body.start_time;
    let endTime = req.body.end_time;

    if(!userType || !startTime || !endTime) {
        return res.status(400).json("invalid request!");
    }

    if(startTime >= endTime) {
        return res.status(400).json("start-time should be lesser than end-time");
    }

    let data_count = await db.Portal_status.count({
        where: {
            user_type: userType
        }
    })
    
    if(data_count !== 0) {
        await sequelize.query(`UPDATE portal_status SET start_time='${startTime}' , end_time='${endTime}'
            WHERE user_type='${userType}'`, {type: Sequelize.QueryTypes.UPDATE});
    } else {
        await sequelize.query(`INSERT INTO portal_status VALUES ('${userType}', '${startTime}', '${endTime}')`,
        {type: Sequelize.QueryTypes.INSERT});
    }
    
    return res.status(200).json("portal time all set!");
}

module.exports.get_portal_timing = async (req, res) => {
    let userType = req.query.user_type;

    if(!userType) {
        return res.status(400).json("invalid request!");
    }

    if (userType === 'admin') {
        let data = await db.Portal_status.findAll();
        return res.status(200).json(data);
    }

    let data = await db.Portal_status.findOne({
        where: {
            user_type: userType
        }
    })

    return res.status(200).json(data);
}