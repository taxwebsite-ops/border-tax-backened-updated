const express = require("express");
const connectDb = require("./Server/db");
const userRouter = require("./Controller/userController");
const adminRouter = require("./Controller/adminController");
const cors = require("cors");
const vehicleRouter = require("./Controller/vechileController");
const vahanapi =require("./Controller/vahanapi")
const app = express()
app.use(express.json());

app.use(cors())
app.use("/user",userRouter)
app.use("/user",vahanapi)
// http://localhost:3000/user/createUser
// http://localhost:3000/user/createUser
// http://localhost:3000/admin/admins
// http://localhost:3000/vechile/getVehicles
app.use("/admin",adminRouter)
app.use("/vechile",vehicleRouter)
app.listen(3000,()=>{
    connectDb
    console.log("Server is running fine at port  3000")
})