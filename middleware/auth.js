//this file acts like the middleware where it take cares of the authentication, basically like a gatekeeper to check the user ID and let them use the application
const {getUser}= require('../Service/auth')

//the below code just checks which user is making the request and never blocks the request.
function checkforauthentication(req,res,next){
    const tokenCookie= req.cookies?.uid;
    req.user=null;
    if(!tokenCookie) return next();

    const token= tokenCookie
    const user= getUser(token);

    req.user=user;
    return next();
}

//Authorization in the form of role the user has like Admin, Normal   
// the below code is RBAC(Role-based access control)
function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");
        //console.log(req.user.role);
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

/*async function handleLoggedInUser(req,res,next){
    const userUid= req.cookies?.uid;
    // if sending token via response
    // const userUid= req.headers["authorization"];
    // to get token based on above since we will be having in the form of "Bearer 2352395u23405324"
    // const token = userUid.split("Bearer ")[1];
    if(!userUid) return res.redirect('/login');
    const user= getUser(userUid);
    // const user= getUser(token);
    if(!user) return res.redirect('/login');

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const userUid= req.cookies?.uid;
     // const userUid= req.headers["authorization"];
    // to get token based on above since we will be having in the form of "Bearer 2352395u23405324"
    // const token = userUid.split("Bearer ")[1];
    // const user= getUser(token);
    const user= getUser(userUid);
    req.user=user;
    next();
}*/

module.exports={
    // handleLoggedInUser,
    // checkAuth,
    checkforauthentication,
    restrictTo,
}