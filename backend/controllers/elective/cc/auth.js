module.exports.login = (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    return res.json({email: email, password: password});
}