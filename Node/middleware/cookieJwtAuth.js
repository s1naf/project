const jwt = require('jsonwebtoken');


const   cookieJwtAuth = (req,res,next) =>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"No Token Provided"});
        
    }

    try{
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Authorized user");
        req.user = user;
        next();
    }catch(err){
        console.log("Error verifying token:", err);
        return res.clearCookie("token");
    }
};

module.exports = cookieJwtAuth;



            