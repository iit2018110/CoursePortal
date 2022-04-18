const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

// middleware to validate if user is authenticated or not
module.exports.authValidator = (req, res, next)=> { 
    if (!req.headers.authorization) {
        return res.status(401).json("Unauthorized request");
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null')
        return res.status(401).json("Unauthorized request");

    let decoded_token = jwt_decode(token);

    let v = jwt.verify(token, process.env.JWTSECRETKEY + decoded_token.userType, (err, payload) => {
        if (err)
            return res.status(401).json("Unauthorized request");

        return next();
    })
}
