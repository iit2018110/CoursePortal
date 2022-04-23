const {body, validationResult } = require('express-validator');

module.exports.loginValidatorSchema = [
    body('email', 'please enter your correct email').isEmail(),
    body('password', 'password should be between 1 to 20 characters').isLength({min: 1, max: 20})
]

module.exports.loginValidator = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    return next();
}

