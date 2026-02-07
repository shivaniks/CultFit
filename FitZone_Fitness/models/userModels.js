//mongoDB 
const mongoose = require('mongoose');

const emailValidator = require('email-validator'); //to validate the email using a npm module
//const bcrypt = require('bcrypt');
const db_link='mongodb+srv://admin:Shiv1906@cluster0.cnq94yq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=mongoose.Schema({
   /* name:{
        type:String,
        require:true
    }, */
    email:{
        type:String,
        require:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
   /* confirmPassword:{
        type:String,
        require:true,
        minlength:8,
        validate:function(){
            return this.confirmPassword==this.password
        } 
    }*/

});
//Aplying hooks so that the repeated data ,confirm password is not saved in db
userSchema.pre('save',function(){
    this.confirmPassword=undefined;

});