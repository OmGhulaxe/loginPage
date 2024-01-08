const User = require("../models/signupmodel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Login =require("../models/loginModel")

//register function
exports.signup = async (req,res)=>{
    try {
        //user input
        const {name,email,password , confirmpassword} = req.body ;
        //check if user inputed th evalue or not
        if(!name || !email || !password || !confirmpassword){
            res.status(401).json({
              success : false ,
              message : "Enter the required details"
            });
        };
        console.log(password);
        console.log(confirmpassword);
        //validation
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({
                success  : false ,
                message :"already registered by this email"
            })
        }
        //check if password and confirm password are correct .
        if(password!=confirmpassword){
            res.status(401).json({
                success : false ,
                message : "Enter the correct password"
            });
        }
        //hashing the password.
        const hashPassword = await bcrypt.hash(password,10);
        console.log(hashPassword);
        //create entry in db
        const user = await User.create({
            name : name,
            email : email,
            password : hashPassword,
        }) ;
        //return res
        res.status(200).json({
            success : true ,
            message : "User registered successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false ,
            message : error.message,
        });
    }
}

//loginUser

exports.login = async(req,res)=>{
    //user input
    try {
        //user input
        const {email , password} = req.body ;
        //validating
        if( !email || !password){
            res.status(401).json({
              success : false ,
              message : "Enter the required details"
            });
        };
        // checking if existing user or not 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false, 
                message : "Please signup",
            });
        }
        console.log(user);
        //checking the password (correct or not)
        if(! await bcrypt.compare(password,user.password)){
           return res.status(401).json({
            success : false ,
            message : "Enter correct password"
           });
        };
        console.log(user.password);
        // creating an entry in db ..
        const userLogin = await Login.create({
            name : user.name,
            email : email,
            loginAt : Date.now()
        });

        //ret res
        return res.status(200).json({
            success: true ,
            message : "User logged in successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};