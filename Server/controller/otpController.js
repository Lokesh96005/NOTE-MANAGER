const Otp = require("../model/otpModel");
const user = require('../model/usermodel')
const sendMail = require("../utils/nodemailer");
const bcrypt=require('bcrypt');
function randomOtp(){
    let otp=Math.trunc(Math.random()*10000);
    if(otp < 1000){
        otp+="0";
    }
    return otp
}

const generateOtp=async(req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({status:false , message:"without email otp cannot be generate"});
    }
    const {email}=req.body;
    const isemail=user.findOne({email})
    if(!isemail){
     return res.status(400).json({status:false , message:"invalid email"});
    }
    if(!email){
        return res.status(400).json({status:false , message:"provide inp fields"});
    }
    let otp=randomOtp();
    try {
        const isUSer= await user.findOne({email});
        if(! isUSer){
            return res.status(400).json({message:"invalid email"});
        }
        await sendMail(email,otp);
        await Otp.insertOne({email,otp});

        return res.status(200).json({message:"otp has be send to your email"});
    } catch (error) {
        return res.status(500).json({message:"server side error"});
    }

}

const handleVerifyOtp=async(req,res)=>{
     if(req.body == undefined){
        return res.status(400).json({status:false , message:"without input of otp cannot be verify"});
    }
    const {otp,email}=req.body;
    if(!otp || ! email){
        return res.status(400).json({status:false , message:"provide inp fields"});
    }

    try {
        const isUser=await Otp.findOne({email});
    
        if(!isUser){
            return res.status(400).json({status:false , message:"invalid email"});
        }
           
        if(isUser.otp != otp){
             return res.status(400).json({status:false , message:"wrong OTP"});
        }

        return res.status(200).json({message:"now you can reset the password"})
    } catch (error) {
        return res.status(500).json({message:"server side error"});
    }
}

const handleChangePassword=async(req,res)=>{
     if(req.body == undefined){
        return res.status(400).json({status:false , message:"without input password cannot be changed"});
    }
    const {password , email}=req.body;
    if(! password || ! email){
        return res.status(400).json({status:false , message:"provide inp fields"});
    }

    try {
        const isUser=await user.findOne({email});
        if(! isUser){
            return res.status(400).json({message:"invalid email"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        isUser.password=hashedPassword;
        await isUser.save();

        return res.status(200).json({message:"password updated"})
    } catch (error) {
         return res.status(500).json({message:"Server Side error"});
    }

}
module.exports={generateOtp,handleVerifyOtp,handleChangePassword};