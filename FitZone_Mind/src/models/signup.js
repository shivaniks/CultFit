const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    fullName: {
        type:String,
        required: true
    },
    phoneNumber: {
        type:Number,
        required:true,
        unique:true
    },
    dob: {
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true
    }

});

const UserInfo = new mongoose.model("UserInfo", userInfo);

module.exports = UserInfo;
