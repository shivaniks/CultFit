const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');

//moddleware func-> post, front-> json
app.use(express.json()); //global middleware
app.listen(3000);
app.use(cookieParser());
const userRouter = require('./Routes/userRouter');
const authRouter = require('./Routes/authRouter');

//Base route
app.use("/user", userRouter);
app.use("/auth", authRouter);


 

