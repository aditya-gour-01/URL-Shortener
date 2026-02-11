const express= require('express')
const URL= require("../models/URL");
const { restrictTo } = require('../middleware/auth');
const USER=require("../models/user");
const router= express.Router();

router.get('/admin/urls',restrictTo(["ADMIN"]),async(req,res)=>{
    //if user is not authenticated then redirect to the login else get the user ID and get it's URL generated. 
    //if(!req.user) return res.redirect("/login");
    const allURLS= await URL.find({});
    const allUsers= await USER.find({});
    const usermapping= allUsers.reduce((map,user)=>{
        map[user._id]= user.name;
        return map;
    },{});
    return res.render("url",{
        urls:allURLS,
        adminboolean:true,
        usermapping: usermapping
    });
})

router.get('/',restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    //if user is not authenticated then redirect to the login else get the user ID and get it's URL generated. 
    //if(!req.user) return res.redirect("/login");
    const allURLS= await URL.find({createdBy: req.user._id});
    return res.render("url",{
        urls:allURLS,
    });
})


router.get('/signup',async(req,res)=>{ 
    return res.render("signup");
})

router.get('/login',async(req,res)=>{ 
    return res.render("login");
})

module.exports= router;