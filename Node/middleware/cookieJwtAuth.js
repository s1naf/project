const jwt = require('jsonwebtoken');


const   cookieJwtAuth = (req,res,next) =>{
    // const authHeader = req.headers.authorization;
    // if(!authHeader){
    //     return res.status(401).json({message:"No Token Provided"});
    // }
    // const token = authHeader.split(" ")[1];
    // console.log("Token from cookie:", token); // Log the token


    // if(!token){
    //     return res.status(401).json({message:"Uknown Token"});
    // }

    // try{
    //     const user = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = user;
    //     console.log("User is",user);
    //     next();

    // }catch(err){
    //     console.log("Error verifying token:", err); // Log the error
    //     return  res.clearCookie("token");
        
    // }


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



            