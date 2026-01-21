const jwt=require('jsonwebtoken')


const verifytoken=async (req,res,next)=>{
    const bearertoken=req.headers.authorization;
  if(! bearertoken){
        return res.status(401).json({status:false,message:'Access Denied. Access token required'});
    }
    const token=bearertoken.split(' ')[1];
    try{
        const payload=jwt.verify(token,"MERN")
        req.payload=payload;
        next();
}
catch(error){
    return res.status(500).json({status:false,message:"server side error"});
}}

module.exports=verifytoken