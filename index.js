const express = require("express");
const connectDb = require("./Server/db");
const userRouter = require("./Controller/userController");
const adminRouter = require("./Controller/adminController");


const app = express()
app.use(express.json());
app.use("/user",userRouter)
app.use("/admin",adminRouter)

app.listen(3000,()=>{
    connectDb
    console.log("Server is running fine at port  3000")
})