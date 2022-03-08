const jwt = require('jsonwebtoken');

module.exports.get_token = (_id,_email,_name) => {
    let payload = {id: _id, email: _email, name: _name};
    let token = jwt.sign(payload, process.env.JWTSECRETKEY);

    return token;
}

module.exports.verify_token = (req, res) => {
    console.log("verify_token route hit");
    let token = req.body.token;
    if(!token) {
        return res.status(401).send(false);
    }

    let payload = jwt.verify(token, process.env.JWTSECRETKEY);

    if(!payload)
        return res.status(401).send(false);

    return res.status(200).send(true);
}