//this file is used to bind the generated cookie/uid to the user logged in into
//the map gets empty when the server re-starts so we need to check this.
//Here we are maintaining the state by storing the id and user in  the map since this is stateful, everytime we re-start the server then it will ask
//us to do the login again so to avoid this we have the stateless architecture of the same

//-------------------------------StateFull---------------------------------------
// const sessionIdToUserMap= new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports={
//     setUser,
//     getUser,
// }

//--------------------Stateless----------------------------
const jwt= require('jsonwebtoken');
const secret= process.env.JWT_SECRET;

//function to create the token
function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    },secret,{ expiresIn: "1h" });
}
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch(error){ return null;}
}


module.exports={
    setUser,
    getUser,
}
