

const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

//TODO if admin = True => findAll
exports.findAll = async(req,res) =>{
    console.log("Find all users");

    try{
        const result = await User.find()
        res.json({status:true, data:result});
    }catch(err){
        res.json({status:false,data:err});
        
    }

}
// Returns a user and personal data,username TODO:return more data
exports.findOne = async(req,res) =>{
    const username = req.params.username;
    

    try{
        const result = await User.findOne({username:username});
        res.json({status:true,data:result});
        console.log("Find user with username " , username);
    }catch(err){
        res.json({status:false,data:err});
        console.log("There was an error");

    }
}
//TODO make the password encrypted in DAO
exports.create = async(req,res) =>{
    const newUser = new User({
        username: req.body.username,
        firstname:  req.body.firstname,
        lastname: req.body.lastname,
        email:  req.body.email,
        password:  req.body.password,
        age: req.body.age,
        country: req.body.country,
        city: req.body.city,
    }); 

    

    try{
        const result = await newUser.save()
        res.json({status:true,data:result})
        console.log("User with username",req.body.username, "Inserted");
    }catch(err){
        res.status(500).json({ status: false, data: err.message });
        console.error("There was an error:", err.message);
    }
}


exports.update = async(req,res) =>{
    const username = req.params.username
    
//You can update filds in db who is unique like username and password and email TODO make recover password
    const updateUser = {
        // username: req.body.username,
        firstname:  req.body.firstname,
        lastname: req.body.lastname,
        // email:  req.body.email,
        // password:  req.body.password,   
    };

    try{
        const result = await User.findOneAndUpdate(
            {username:username},
            updateUser
            // if you want to update a fild that dosnt exist the {new:true} gonna create the fild,try this when testing for db
        )
        
        res.json({status:true,data:result});
        console.log("Update user with username", username);
    }catch (err){
        res.json({status:false,data:err});
        console.log("There was an error");
    }
}

exports.delete = async(req,res) =>{
    const username = req.params.username;

    

    try{
        const result = await User.findOneAndDelete({username:username})
        res.json({status:true,data:result});
        console.log("Delete user with username",username);
    }catch(err){
        res.json({status:false,data:result});
        console.log("There was an error");
    }
}

exports.login = async(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;



    const user = await User(username);

    if(user.password !== password){
        return res.json({status:403,data:"Invalid password"});
    }
    //Signature
    const token = jwt.sign(user,process.env.JWT_SECRET,{expiresIn:"1h"});
    res.cookie("token",token,{httpOnly:true});

    return res.redirect("/api/choices");
}