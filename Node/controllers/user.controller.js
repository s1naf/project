const User = require('../models/user.model')

exports.findAll = async(req,res) =>{
    console.log("Find all users");

    try{
        const result = await User.find()
        res.json({status:true, data:result})
    }catch(err){
        res.json({status:false,data:err})
    }

}