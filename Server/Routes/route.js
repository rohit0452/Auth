const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const  Authenticate = require("./middleware/Authenticate");

router.use(cookieParser());





// routers
router.get("/",(req,res)=>{
    res.send("Homepage")
})

//  SignUp

router.post("/signup", async (req,res)=>{
   const {name , email , phone, work, password , cpassword}  = req.body;

   if(!name , !email , !phone, !work, !password , !cpassword){
       return res.status(422).json({error : "Please fill all the fields"})
   }
try{
   const userexist= await User.findOne({email : email});
        

       if(userexist){ 
           return res.status(422).json({error : "Email already Registered"})
       }else if(password!=cpassword){
           return res.status(422).json({error : "Password doesnt match" })
       }else{ 

        const user = new User({name , email , phone, work, password , cpassword})
        const userregister =  user.save();
        if(userregister){
            res.status(200).json("Registered Successfully")
            console.log("User Registered Successfully")
        }else{
            res.status(422).json("Failed to registered")
            // console.log("Failed to registered")
        }
       }

         
    }catch(err){
        console.log("Error"  + err);
    }
    })

    // Sign In 
    router.post("/signin", async(req,res)=>{
       let token;
        const {email , password} = req.body;
        if(!email || !password){
            res.status(422).json("Required cant be blank")
        }
        const data = await User.findOne({email : email})

        if(data){
        const isMatch = await bcrypt.compare(password , data.password)
        // const token =  data.generateAuthToken();
        // // res.header('Access-Control-Allow-Credentials', true)
        // res.cookie("token", token , {expires : new Date(Date.now()+8.64e+7) , httpOnly: true})
        // console.log(token);
        // console.log(data);
         
        // const token = jwt.sign({_id : data._id}, process.env.SECRET_KEY , );
         token =await data.generateAuthToken();
        // console.log("ttttt" + token); 
        res.cookie("jwtoken",token ,{expires : new Date().now + 60*60000},{
            httpOnly: true,
           
        })
        
        if(!isMatch){
            res.status(422).json("Invalid Credential pass")
        }else{
            console.log(token)
            res.send("login success")
            
        }
    
    }else{
        res.status(422).json("Invalid Credential mail")
    }
    
        
           
        }
       
    )

router.get("/aboutus", Authenticate , (req,res)=>{
    res.send(req.rootUser);
    console.log("About Called");
})

router.get("/getdata", Authenticate ,(req,res)=>{
    res.send(req.rootUser);
    console.log("About Page Called");
})

router.post("/contact" , Authenticate ,async (req,res)=>{
    try {
        const {name ,email , phone ,message} = req.body
        if(!name || !email || !phone || !message){
            console.log("contact Page Called");
            return res.json({error : "Empty"})

        }

        const userContact =await User.findOne({_id : req.userId})
        // console.log(userContact);cls

        if(userContact){
            const useMessage =await userContact.addMessage({name , email ,phone , message})
            await  userContact.save();
            console.log(userContact);
            res.status(201).json({message : "Message Sent Successfully"})

            console.log("Message sent Succesfully");
        }
    } catch (error) {
        console.log(error);  
    }
})

router.get("/logout" , (req,res)=>{
    console.log("user logout");
    res.clearCookie("jwtoken" )
    res.status(200).json("OK") 
})



  
 
module.exports = router ;