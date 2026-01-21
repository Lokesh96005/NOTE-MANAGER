const express =require('express')
const {handleUserSignup,handleUserLogin,getuserinfo,handleuserUpdatename,handleUserUpdatepassword} = require('../controller/userController')
const verifytoken =require('../middleware/verifytoken')
const userRouter=express.Router()

userRouter.post('/signup',handleUserSignup)
userRouter.post('/login',handleUserLogin)

userRouter.get('/',verifytoken,getuserinfo)

userRouter.patch('/name',verifytoken,handleuserUpdatename)
userRouter.patch('/password',verifytoken,handleUserUpdatepassword)

module.exports=userRouter