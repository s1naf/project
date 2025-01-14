const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// let regionSchema = new Schema({
//     country : {type:String},
//     city : {type:String}
// }, {_id:false})

// let ageSchema = new Schema({
//     day : {type:Number},
//     month : {type:Number},
//     year : {type:Number}
// }, {_id:false})

// let choicesQandASchema = new Schema({
//     questions:{type:String},
//     answers:{type:String},
//     date:{type:Date,default:Date.now}
// })

// let savedAnswersSchema = new Schema({
//     answers:[String],
//     date:{type:Date,default:Date.now}
// })

let postSchema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
});



let userSchema = new Schema({
    role:{
        type:String,
        enum: ['admin','user'],
        default: 'user'
    },
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
        unique:false,
        trim:true,
    },
    lastname:{
        type:String,
        required: [true,'Lastname is required'],
        max:50,
        unique:false,
        trim:true,
    },
    email:{
        type:String,
        required: [true,'Email is required'],
        
        unique:true,
        trim:true,
        uniqueCaseInsensitive: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email address is not valid"
        ]
    },
    // age : ageSchema,
    age:{
        type:Number,
        require:[true,'age is reuired'],
        min:18,
        max:100,
        unique:false,
        trim:true
    },
    // na ginei sinxoneusei answers kai choices h na ginei apo [] se {key:value}({question:answer}) kai gia ka8e choice tha prepei na exei to Question ena _id:true gia na ginete modify to antistixo answer tou. 
    // answers : { type : [savedAnswersSchema],null:true},
    // choices:  {type:[choicesQandASchema],null:true},

    // choicesQandA: {te:[choicesQandASchema],null:true},

    posts:{
        type: [postSchema],
        default: [],
        min:3,
        max:100,
    }

},
{
    collection:'users',
    timestamps:true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema)
