const mongoose = require("mongoose");
const { login } = require("../controller/main");
const loginSchema =  new mongoose.Schema({

    name :{
        type : String ,
        required : true ,
    },
    email : {
        type : String ,
        required : true 
    },
    loginAt :{
        type : Date
    }
})
module.exports = mongoose.model("Login",loginSchema);