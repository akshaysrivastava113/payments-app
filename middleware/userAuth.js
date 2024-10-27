const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function userAuth(req,res,next){
    let token = req.headers.authorization;
    token = token.split(' ')[1].trim();
    console.log(token);

    let verifiedToken;
    try {
        verifiedToken = jwt.verify(token, JWT_SECRET);
    } catch(e){
        console.error(e);
    }

    console.log(verifiedToken);
    if(!verifiedToken){
        return res.status(411).json({
            "msg": "Token not verofied"
        });  
    }

    req.userId = verifiedToken.userId;
    next();
}

module.exports = {
    userAuth
}