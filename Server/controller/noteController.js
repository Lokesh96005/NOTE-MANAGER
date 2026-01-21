const Note = require("../model/noteModel");

const handleCreateNote=async(req,res)=>{
    const {_id}=req.payload;
     if(req.body == undefined){
        return res.status(400).json({status:false , message:"provide details"});
    }
    const {note}=req.body;
    if(!note){
        return res.status(400).json({status:false,message:"provide input field"});
    }
    try {
        await Note.insertOne({note,user:_id});
        return res.status(201).json({status:true,message:"note created successfully"})
    } catch (error) {
        return res.status(500).json({status:false,message:"server side error"});
    }
}

const getNotes=async(req,res)=>{
    const {_id}=req.payload;
    try {
        const notes=await Note.find({user:_id});
        return res.status(200).json({status:true,notes});
    } catch (error) {
        return res.status(500).json({status:false,message:"server side error"});
    }
}

const handleDeleteNote=async(req,res)=>{
     const {_id}=req.params;
    try {
        await Note.deleteOne({_id});
        return res.status(200).json({status:true,message:"note delete successfully"});
    } catch (error) {
        return res.status(500).json({status:false,message:"server side error"});
    }
}

module.exports={handleCreateNote,getNotes,handleDeleteNote}