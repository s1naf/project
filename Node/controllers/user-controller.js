const logger = require('../logger/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model')

exports.findAll = async(req,res) =>{
    console.log("Find all users");

    try{
        const result = await User.find({},{username:1,_id:0,role:1});
        // logger.info("Find all users");
        res.json({status:true, data:result});
    }catch(err){
        // logger.error("There was an error", err);
        res.json({status:false,data:err});
        
    }

}
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




exports.delete = async (req, res) => {
    const username = req.params.username;
  
    console.log("Delete user with username", username);
  
    try {
      const result = await User.findOneAndDelete({ username: username });
      if (!result) {
        console.log("User not found with username", username);
        return res.status(404).json({ status: false, data: "User not found" });
      }
      res.json({ status: true, data: result });
      console.log("Deleted user with username", username);
    } catch (err) {
      console.log("There was an error", err);
      res.status(500).json({ status: false, data: err });
    }
  };
  

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
    const token = jwt.sign({username:user.username,id:user._id,role:user.role,email:user.email   },process.env.JWT_SECRET,{expiresIn:800});
    console.log('Login successful for user:', username);
    console.log("Token created");
    
    res.cookie("token", token, { httpOnly: true, secure: false });
 
    return res.status(200).json({ status: 200, data: token }); 
}catch(err){
    return res.status(500).json({status:500,data:err});
    }
}


exports.checkEmail = async(req,res) =>{
    const email = req.body.email;

    try{
        const result = await User.findOne({email:email});

        if(!result){
            notExist = true;
            res.json({status:true,data:notExist});
            console.log("Email doesnt exist");
        }
    }catch(err){
        notExist = false;
        res.json({status:false,data:notExist});
        console.log("Email already exists");
    }
    
}

exports.checkUsername = async (req, res) => {
    const username = req.body.username;
  
    try {
      const result = await User.findOne({ username: username });
  
      if (!result) {
        notExist = true;
        console.log("Username doesn't exist");
        return res.json({ status: true, data: notExist });
      }
      console.log("Username already exists");
    } catch (err) {
      notExist = false;
      console.log("Username already exists");
      return res.json({ status: false, data: notExist });
    }
  };

  exports.updateUser = async (req, res) => {
  
  
    const userId = req.body.id;
    const { username, email, firstname, lastname, newPassword } = req.body;

  try {
    console.log("Updating user with id:", userId);
    const existingUser = await User.findById(userId );
    console.log("User found:", existingUser);
    if (!existingUser) {
      return res.status(404).json({ status: false, data: "User not found" });
    }

    if (username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists && usernameExists.id !== userId) {
        return res.status(400).json({ status: false, data: "Username already exists" });
      }
      existingUser.username = username;
      console.log("Username updated",existingUser.username);
    }

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists.id !== userId) {
        return res.status(400).json({ status: false, data: "Email already exists" });
      }
      existingUser.email = email;
      console.log("Email updated",existingUser.email);
    }

    if (firstname) {
      existingUser.firstname = firstname;
      console.log("Firstname updated",existingUser.firstname);
    }

    if (lastname) {
      existingUser.lastname = lastname;
      console.log("Lastname updated",existingUser.lastname);
    }

    if (newPassword) {
      existingUser.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await existingUser.save();
    console.log("User updated successfully:", updatedUser);
    res.json({ status: true, data: updatedUser });

    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ status: false, data: "Internal server error" });
    }
  };
exports.updateRole = async (req, res) => {
    const username = req.body.username;
    const role = req.body.role;
  
    try {
      const updatedUser = await User.findOneAndUpdate({username:username},{role:role},{new:true});
      res.json({ status: true, data: updatedUser });
    }catch(err){
        console.log("There was an error updating the user:", err);
        res.status(500).json({ status: false, data: err });
    }
}

