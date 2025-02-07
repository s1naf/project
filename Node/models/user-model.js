const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let postSchema = new Schema({
    content: { type: String, required: true },
    date: { type: String, default: Date }
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
    age:{
        type:Number,
        require:[true,'age is reuired'],
        min:18,
        max:100,
        unique:false,
        trim:true
    },

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
