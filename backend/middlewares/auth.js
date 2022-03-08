module.exports.auth_validator = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json("Unauthorized request");
    }

    let token  = req.headers.authorization.split(' ')[1];

    if(token === 'null')
        return res.status(401).json("Unauthorized request");
    
    let v = jwt.verify(token, process.env.JWTSECRETKEY , (err,payload)=>{
        if(err) 
            return res.status(401).json("Unauthorized request");

        return next();
    })
}