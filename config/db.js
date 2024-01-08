const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true ,
        useUnifiedTopology : true ,
    })
    .then(()=>{console.log("db connection successful");})
    .catch((err)=>{
        console.error(err);
        console.log(err.message);
        process.exit(1);
    })
}

module.exports =dbConnect;  