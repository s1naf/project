const User = require('../models/user-model');

exports.findAll = async(req,res) =>{
    console.log("Find all users questions");

    try{
        const result = await User.find({},{username:1,choicesQandA:1, _id:0});
        res.json({status:true,data:result});

    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.findOne = async(req,res) =>{
    const username = req.params.username;
    

    

    try{
        const result = await User.findOne(
            {username:username},
            {username:1,questions:1,answers:1,_id:0})
            console.log("Find questions and answer for user",username)

        res.json({status:true,data:result});
    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.create = async(req,res) =>{
    const username = req.params.username;
    const question = req.body.questions;
    const answer = req.body.answers;

    console.log("Insert quetion to user",username);
    try{
        const result = await User.updateOne(
            {username:username},
            {
                $push:{
                    choicesQandA:{
                        questions :question,
                        answers:answer
                    }
                }
            }
        )
        
        res.json({ status: true, data: result});
        console.log("Choices for user",username,"inserted")
    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.update = async(req,res) =>{
    const username = req.params.username;
    const choice_id = req.body._id;
    const answer = req.body.answers;
   
  
    
// gia docs 8:29 mathima 26/09
    try{
        const result = await User.updateOne(
            {username:username,"choicesQandA._id":choice_id},
            {
                $set:{
                    "choicesQandA.$.answers":answer
                }
            }
        )
        console.log("Update answer question for user ",username);
        res.json({status:true,data:result})
    }catch(err){
        res.json({status:false,data:err});
    }
}

exports.delete = async(req,res) => {
    const username = req.params.username;
    const choice_id = req.body.id;

    console.log("Delete the answer for choice(questio)")

    try{
        const result = await User.updateOne(
            {username:username},
            {
                $pull:{
                    choices:{_id:choice_id}
                }
            }
        )
        res.json({status:true,data:result})

    }catch(err){
        res.json({status:false,data:err})
    }
}