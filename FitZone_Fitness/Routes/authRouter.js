const express = require("express");
const authRouter = express.Router();
const userModels=require('../models/userModels');

//All the required functions
authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

authRouter
.route('/login')
.post(loginUser);


//Creating functions
//Basically sending the html file of signup to user in frontend

function middleware1(req,res,next){

}
function middleware2(req,res){
    console.log('middleware2 encountered');
    //next();
    console.log("middleware 2 ended req/res cycle");
    res.sendFile('/Signup/signup.html',{root:__dirname});
}

function getSignUp (req,res,next){
   console.log('getSignUp called');
   next();
    // res.sendFile('/Signup/signup.html',{root:__dirname});
}

async function postSignUp(req,res){
    let dataobj=req.body;
    let user=await userModel.create(dataObj);
    //console.log('Backend',user);
    res.json({
        message:"User signed up",
        data:obj
    }); 
}

async function loginUser(req,res){
    try{
         let data=req.body;
         let user=await userModel.findOne({email:data.email});
         if(user){
            if(user.password==data.password){
              res.cookie('isLoggedIn',true);
                return res.json({
                message: 'User has logged in',
                userDetails:data
              });
        }
     else{
        return res.json({
            message:'wrong credentials'
        })
      }
     }
     else{
     return res.json({
        message:'User not found'
     })
     }
    }
    catch(err){
        return res.json(500).json({
            message:err.message
        })

    }
}
module.exports=authRouter;