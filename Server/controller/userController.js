const user = require("../model/usermodel");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');


const handleUserSignup=async (req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({status:false,message:'Without details user cannot be created'});
    }
    try{
        const{name,email,password}=req.body

        if(!name || !email || !password){
            return res.status(400).json({status:false,message:"input fields should not be empty"})
        }

    const isUser= await user.findOne({email});

    if(isUser){
        return res.status(400).json({status:false,message:"withn this Email user already exist"})
    }

   const hashedpassword= await bcrypt.hash(password,10);
    await user.insertOne({name,email,password:hashedpassword});

    return res.status(201).json({status:true,message:"User created Successfully"})
     }
    catch(error){
        return res.status(500).json({status:false,message:"server side error"});

    }

   
}

const handleUserLogin=async(req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({status:false,message:'Without details user cannot be created'});
    }
    try{
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({status:false,message:"input fields should not be empty"})
           
        }
         

    const isUser= await user.findOne({email})

    if(!isUser){
        return res.status(400).json({status:false,message:"with this email user does not exist"})
    }
    const isMatched=await bcrypt.compare(password,isUser.password)
    if(! isMatched){
       
        return res.status(400).json({status:false,message:"password incorrect"})
        
    }
    let payload={_id:isUser._id,email}
 const token=jwt.sign(payload,"MERN",{expiresIn:"30m"});
 return res.status(200).json({status:true,message:"Login successful",token});


}
catch(error){
    return res.status(500).json({status:false,message:"server side error"});
}}

const getuserinfo=async(req,res)=>{
    const {_id}=req.payload
    try{ 
        const users = await user.findOne({ _id }, { password: 0 });
        return res.status(200).json({status:true,users})
}
catch(error){
    return res.status(500).json({status:false,message:"server side error"});
}}

const handleuserUpdatename=async(req,res)=>{
    const {_id}=req.payload
  if(req.body== undefined){
        return res.status(400).json({status:false,message:'Without details user name cannot be update'});
    }
    try{
        const {name}=req.body
      if(!name){
        return res.status(400).json({status:false,message:"provide all the input fields"})
      }
      await user.findByIdAndUpdate({_id} ,{$set :{name:name}});

      return res.status(200).json({status:true,message:"user name updated"})
}
catch(error){
    return res.status(500).json({status:false,message:"server side error"});
}}


const handleUserUpdatepassword=async (req,res)=>{
     const {_id}=req.payload

  if(req.body== undefined){
        return res.status(400).json({status:false,message:'Without details password cannot be update'});
    }
try{
    const {password,newpassword}=req.body
    if(!password || !newpassword){
        return res.status(400).json({status:false,message :"provide all the input fields"});
    }
const users=await user.findById({_id});
const isMatched=await bcrypt.compare(password,users.password);
if(! isMatched){
     return res.status(400).json({status:false,message :"current password is not matching"});
}
if(password == newpassword){
    return res.status(400).json({status:false,message :"current password cannot be same as newpassword"});
}
const hashedpass=await bcrypt.hash(newpassword,10);
await user.findOneAndUpdate({_id},{$set:{password:hashedpass}})
 return res.status(200).json({status:true,message :"password updated"});

}
catch(error){
    return res.status(500).json({status:false,message:"server side error"});
}
}



module.exports={handleUserLogin,handleUserSignup,getuserinfo,handleuserUpdatename,handleUserUpdatepassword}