const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports.get_token = (_userType, _id, _email, _name) => {
    let payload = { userType: _userType, id: _id, email: _email, name: _name };
    let token = jwt.sign(payload, process.env.JWTSECRETKEY + _userType);

    return token;
}

module.exports.verify_token = (req, res) => {
    console.log("verify_token route hit");
    let token = req.body.token;
    if (!token) {
        return res.status(401).send(false);
    }

    let decoded_token = jwt_decode(token);

    let payload = jwt.verify(token, process.env.JWTSECRETKEY + decoded_token.userType);

    if (!payload)
        return res.status(401).send(false);

    return res.status(200).send(true);
}