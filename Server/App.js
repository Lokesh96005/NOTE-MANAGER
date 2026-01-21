const express=require('express');
const app=express();
const connectDb=require('./db/dbConnect');
const userRouter=require('./route/userRouter');
const cors=require('cors');
const noteRouter = require('./route/noteRouter');
const otpRouter = require('./route/otpRouter');

// Cors middleware to access the data from frontend
app.use(cors())
// json middleWare
app.use(express.json());

//DB connection
connectDb();


app.use('/api/v1/user',userRouter);
app.use('/api/v1/note',noteRouter);
app.use('/api/v1/otp',otpRouter);




app.listen(3000,'localhost',()=>{
    console.log('server started at http://localhost:3000')
})