require("dotenv").config();
const express= require('express');
const path= require("path");
const urlRoute= require('./routes/url');
const StaticRouter= require('./routes/StaticRouter');
const userRoute= require('./routes/user');
const {connectToMongo}= require('./connect');
const URL= require('./models/URL')
const cookieParser= require("cookie-parser"); //used to parse incoming request cookie and for auth via cookies
//const {handleLoggedInUser, checkAuth}= require('./middleware/auth')
const {checkforauthentication,restrictTo}= require('./middleware/auth') //this identifies logged-in user, and role based access control(RBAC)

const app= express();
const PORT= 8001;

connectToMongo(process.env.MONGO_URI).then(()=>console.log("connected to the DB"));

app.set("view engine","ejs"); //EJS for server side rendering
app.set("views",path.resolve("./views")); //EJS is applied at this folder
app.use(express.json()); //Parses JSON request bodies (application/json)
app.use(cookieParser()); //Makes cookies available as req.cookies
app.use(express.urlencoded({extended: false})); //Parses form submissions (application/x-www-form-urlencoded)
app.use(checkforauthentication);

//app.use is how we attach the middleware/routes to the express app. an every request flowing in server will start and end here 
//ex app.use(req,res,next) it can read/modify all the parameters over here
//syntax of this is app.use(path?, middleware)
app.use('/',StaticRouter);  
app.use('/user',userRoute);
app.use('/url', restrictTo(["NORMAL","ADMIN"]),urlRoute); //this line means for any route starting with URL first check the role of the user and the go to urlroute
app.get('/url/:shortId',async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory:{timestamp: Date.now()} 
    }})
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`))
