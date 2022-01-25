const  jwt = require("jsonwebtoken")            
const User = require("../../models/userSchema");

const Authenticate = async (req,res,next)=>{
try {
    const token = req.cookies.jwtoken ; 
    console.log(token);
    const verifytoken = jwt.verify(token , process.env.SECRET_KEY);
    console.log("verify"+ verifytoken);

    const rootUser = await User.findOne({_id : verifytoken._id , "tokens.token" : token});
    if(!rootUser){ throw new Error("User Not Found") }

    req.token = token ;
    req.rootUser = rootUser ;
    req.userId = rootUser._id ; 
    next() 
    
} catch (error) {
    res.status(401).send(" TOken Not Match Unauthorised User");

}

}
module.exports = Authenticate ; 