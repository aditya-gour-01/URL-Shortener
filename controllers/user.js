const User= require("../models/user")
const {v4: uuidv4}= require('uuid')
const {setUser}= require('../Service/auth');
const { response } = require("express");

async function handleUserSignup(req,res){
    const {name, email, password}= req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {name, email, password}= req.body;
    const user= await User.findOne({email, password});
    if(!user) return res.render("login",{
        error: "Invalid Username or password",
    });

    //for stateful-- const sessionId= uuidv4(); 
    //setUser(sessionId,user);
    //res.cookie("uid",sessionId); //name of cookie is uid and the value is sessionId

    const token = setUser(user);
    res.cookie("uid",token);
    //if token to be send via the response then use authorization header 
    // return res.json({token})
    return res.redirect("/");
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}