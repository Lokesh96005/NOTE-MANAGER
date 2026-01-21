const mongoose=require('mongoose');

const noteSchema=new mongoose.Schema({
    note:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});


const Note=mongoose.model('note',noteSchema);

module.exports=Note;