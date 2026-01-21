const express=require('express');
const verifytoken = require('../middleware/verifytoken');
const { handleCreateNote, getNotes, handleDeleteNote } = require('../controller/noteController');

const noteRouter=express.Router();

noteRouter.post('/create',verifytoken,handleCreateNote);
noteRouter.get('/',verifytoken,getNotes);
noteRouter.delete('/delete/:_id',verifytoken,handleDeleteNote)
module.exports=noteRouter