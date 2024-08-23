const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const validator=require('validator');

require("dotenv").config();

//create token
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


//login user
exports.loginUser=async(req,res)=>{
    try{
        //fetch data
        const {email,password}=req.body;

        const user= await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Email not registered"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }else{
            const token=createToken(user._id);
            return res.status(200).json({
                success:true,
                message:"Login successful !!",
                token:token
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Login User",
            error
        })
    }
}





//register user
exports.registerUser=async(req,res)=>{
    try{
        //fetch data from req body
        const {name,email,password}=req.body;
        // if email already exists?
        const exists=await User.findOne({email: email});
        if(exists){
            return res.status(401).json({
                success:false,
                message:"User Already exists",
            })
        }

        //validatating email and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Please Enter valid Email"
            })
        }

        if(password.length<8){
            return res.status(400).json({
                success:false,
                message:"Please Enter Strong password"
            })
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user=await newUser.save();

        const token=createToken(user._id);

        return res.status(200).json({
            success:true,
            message:"User Registered successfully",
            token:token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in register user"
        })
    }
}