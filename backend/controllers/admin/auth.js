const db = require('../../utils/database/db');
const {get_token} = require('../../utils/jwt-token/jwt');

module.exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    db.Admin.findOne({
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

        let token = get_token('admin', user.id, user.email, user.name);
        return res.status(200).json(token);
    })
    .catch((err)=>{
        console.log("Error in admin login", err);
        return res.status(400).json("Error in admin login");
    })
}