const db = require('../../../utils/database/db');
const {get_token} = require('../../../utils/jwt-token/jwt');

module.exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    db.HOD.findOne({
        where: {
            email: email
        }
    })
    .then((user)=>{
        if(!user) {
            return res.status(401).json("Wrong email");
        }

        if(user.password !== password) {
            return res.status(401).json("Wrong password");
        }

        let token = get_token('hod', user.id, user.email, user.name);
        return res.status(200).json(token);
    })
    .catch((err)=>{
        console.log("Error in HOD login", err);
        return res.status(400).json("Error in HOD login");
    })
}