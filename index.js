const express = require("express")
const cors = require("cors")
const { connection } = require("./configs/db")
const { authenticate } = require("./middleware/authenticate")
const {userRouter} =require("./routes/user.routes")
const {bugRouter} = require("./routes/bugs.routes")
const app = express()
app.use(express.json())
app.use(cors())

// app.use("/",(req,res)=>{
    //     res.send("hello welcome to  the app")
    // })
    app.use("/user",userRouter)
    app.use(authenticate)
    app.use("/bug",bugRouter)


    
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
   console.log(`app running at ${process.env.port}`);
})
