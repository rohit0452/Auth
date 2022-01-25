const mongoose = require("mongoose");

// DB Connectivity
const db = process.env.DATABASE   

mongoose.connect(db , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
}).then(()=> console.log("Database Connected"))
.catch((err)=>{
    console.log("No Connection");
})