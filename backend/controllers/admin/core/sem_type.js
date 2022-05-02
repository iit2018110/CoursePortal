const Sequelize = require('sequelize');
const sequelize = require("../../../utils/database/config");
const db = require('../../../utils/database/db');

module.exports.set_sem_type = async (req, res) => {
    let semType = req.body.sem_type;

    if (!semType) {
        return res.status(400).json("invalid request!");
    }

    let data_present = await db.Params.count({
        where: {
            key: 'sem_type'
        }
    })

    if (data_present) {
        await db.Params.update({
            value: semType
        }, {
            where: {
                key: 'sem_type'
            }
        })
    } else {
        await db.Params.create({
            key: 'sem_type',
            value: semType
        })
    }

    return res.status(200).json("sem_type updated");
}

module.exports.get_sem_type = async (req, res) => {
    let data_present = await db.Params.findAndCountAll({
        where: {
            key: 'sem_type'
        }
    });

    if (!data_present.count) {
        await db.Params.create({
            key: 'sem_type',
            value: 'odd'
        })

        return res.status(200).json("odd");
    }

    return res.status(200).json(data_present.rows[0].value)
}