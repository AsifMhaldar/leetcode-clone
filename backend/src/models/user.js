const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    lastName:{
        type : String,
        minLength : 3,
        maxLength : 20
    },
    emailId:{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        immutable : true
    },
    age:{
        type : Number,
        min : 5,
        max : 80,
    },
    role:{
        type : String,
        enum :['user', 'admin'],
        default : 'user',
    },
    problemSolved:{
        type : [
            {
                type:Schema.Types.ObjectId,
                ref: 'problem',
                unique:true
            }
        ],  
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
        default: 'Passionate coder solving challenges one problem at a time.',
        maxLength: 500,
    },
    github:{
        type: String,
        default: '',
    },
    linkedin:{
        type: String,
        default: '',
    },
    website:{
        type: String,
        default: '',
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }],

}, { timestamps:true })


const User = mongoose.model("user", userSchema);

module.exports = User;

