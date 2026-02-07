//import express_module 
const { request } = require('express');
const express = require('express')
const UserInfo = require('../models/signup');
//calling Router_function of express
const routes = express.Router();

routes.get("/mind", (request,response) => {
    response.render("index");
})

//get function to render(/signupPage)
routes.get("/signup", (request,response) => {
    response.render("signupPage");
})
//post function to upload data to database
routes.post("/signup",async (request,response) => {
    try {
        const userDetail = new UserInfo({
            email: request.body.email,
            password: request.body.password,
            fullName: request.body.fullName,
            phoneNumber: request.body.phoneNumber,
            dob: request.body.dob,
            gender: request.body.gender 
        });

        const userSignupConmplete = await userDetail.save();
        response.status(201).redirect("/mind");

    }catch(error) {
        response.status(400).send(error);
    }
})

routes.get('/mind/oneRep' , (request,response)=>{
    response.render("oneRep");
})
routes.get('/mind/oneRep/healthyWeightLoss' , (request,response)=>{
    response.render("healthyWeightLoss");
})

routes.post("/mind", async (request,response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const useremail = await UserInfo.findOne({email:email});
        
        if(useremail.password === password){
            response.send(201).render("index");
        } else{
            response.send("Password is wronge");
        }

    } catch(error) {
        response.status(400).send("Invalid Email");
    }
})

//export routes 
module.exports = routes
