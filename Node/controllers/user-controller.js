
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

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
exports.create = async(req,res) =>{

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        firstname:  req.body.firstname,
        lastname: req.body.lastname,
        email:  req.body.email,
        password:  hashedPassword,
        age: req.body.age,      
    }); 

    const existingUser = await User.findOne({ username: req.body.username });	
    if (existingUser) {
        return res.status(400).send('User already exists');
    }
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
        return res.status(400).send('Email already exists');
    }

    

    try{
        const result = await newUser.save()
        res.json({status:true,data:result})
        console.log("User with username",req.body.username, "Inserted");
    }catch(err){
        res.json({ status: false, data: err });
        console.error("There was an error:", err);
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


try{
    const user = await User.findOne({username});
    
    console.log("Trying to find if user exists");
    if (!user) {
        return res.status(400).json({ status: 400, data: "Invalid username or password" });
    }
    console.log("User password comparation");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid username or password');
    }
    
    console.log("Creating token");
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    //Signature
    const token = jwt.sign({username:user.username,id:user._id,role:user.role   },process.env.JWT_SECRET,{expiresIn:"1h"});
    console.log('Login successful for user:', username);
    console.log("Token created");
    
    res.cookie("token", token, { httpOnly: true, secure: false });
 
    return res.status(200).json({ status: 200, data: token }); 
}catch(err){
    return res.status(500).json({status:500,data:err});
    }
}


// exports.checkEmail = async(req,res) =>{
//     const email = req.params.email;

//     try{
//         const result = await User.findOne({email:email});

//         if(!result){
//             res.json({status:true,data:result});
//             console.log("Email doesnt exist");
//         }
//         res.json({status:true,data:result});
//     }catch(err){
//         res.json({status:false,data:err});
//         console.log("Email already exists");
//     }
    
// }