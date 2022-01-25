const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const app = express();
const cors = require("cors")
env.config({path:"./config.env"})
const PORT = process.env.PORT


require("./db/conn")
app.use(express.json())
const corsOption = {
    origin : "http://localhost:3000",
    credentials: true,
    header : 'Access-Control-Allow-Credentials' 
}
app.use(cors(corsOption))
app.use(cookieParser());
const User = require("./models/userSchema")


// MiddleWare 
app.use(require("./Routes/route"))



const middleware = (req,res,next) =>{
    console.log("Hi I m middleware");
    next();
}


app.listen(PORT,()=> {
    console.log("Server Started on " + PORT)
});