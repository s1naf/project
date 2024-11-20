const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let regionSchema = new Schema({
    Country : {type:String},
    City : {type:String}
}, {_id:false})

let ageSchema = new Schema({
    day : {type:Number},
    month : {type:Number},
    year : {type:Number}
}, {_id:false})

let choicesQandASchema = new Schema({
    questions:[String],
    answers:[Number],
    date:{type:Date,default:Date.now}
})

let savedAnswersSchema = new Schema({
    answers:[String],
    date:{type:Date,default:Date.now}
})

let userSchema = new Schema({
    username:{
        type: String,
        required: [true,'Username is required'],
        max:50,
        unique:true,
        trim:true,  
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        max:40,
        min:4,
    },
    firstname:{
        type:String,
        required: [true,'Firstname is required'],
        max:50,
        unique:true,
        trim:true,
    },
    lastname:{
        type:String,
        required: [true,'Lastname is required'],
        max:50,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required: [true,'Email is required'],
        max:30,
        unique:true,
        trim:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-])?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid"
        ]
    },
    region: regionSchema,
    age : ageSchema,
    answers : { type : [savedAnswersSchema],null:true},
    choices:  {type:[choicesQandASchema],null:true}
},
{
    collection:'users',
    timestamps:true
});

module.exports = mongoose.model('User',userSchema)
