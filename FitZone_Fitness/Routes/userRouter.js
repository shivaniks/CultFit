const express = require("express");
const userRouter = express.Router();
const userModels=require('../models/userModels');
const protectRoute=require('../Routes/authhelper');

userRouter
.route("/")
.get(protectRoute,getUsers) //path specific middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route("/getCookies")
.get(getCookies);

userRouter
.route("/setCookies")
.get(setCookies);

userRouter
.route("/:id")
.get(getUserById);

async function getUsers(req,res){
    let users=await userModels.find();
    if(users){
        return res.json(users);
    }
    else{
        return res.json({
            message:'user not found'
        });
    }

}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
         message:"data received successfully",
         user: req.body,
    });
    
}

async function updateUser(req,res){
    console.log("req.body->", req.body);

    let dataToBeUpdated = req.body;
    let user = await userModels.findOneAndUpdate(
        {email:'abc@gmail.com'},dataToBeUpdated);
    res.json({
        message: "data updated successfully",
        data:user
    });
}

async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user=await userModels.findOneAndDelete
    (dataToBeDeleted);
    res.json({
        message: "data has been deleted",
        data:user
    });
}


function getUserById(req,res){
    console.log(req.params.username);
    console.log(req.params);
    res.send("user id received");
}

function setCookies(req,res){
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true , httpOnly:true});
    res.send('cookies has been set');
}
function getCookies(req,res){
     let cookies=req.cookies.isLoggedIn;
     console.log(cookies);
     res.send('cookies received');
}




module.exports=userRouter;
