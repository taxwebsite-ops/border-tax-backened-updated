
const express =require("express")
const userModel = require("../Modal/userModal.js")
const userRouter = express.Router()


userRouter.post("/createUser",async(req,res)=>{

    const payload  = req.body;
    try {
        const existingUser  = await userModel.findOne({username:payload.username})
        console.log(existingUser)
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const user = await userModel.create(payload);
        res.status(200).json({msg:"User creted successfully "})
        
    } catch (error) {
        res.status(401).json({msg:error.message})
        
    }

})


userRouter.post("/loginUser",async(req,res)=>{

    const payload  = req.body;
    try {

        const user = await userModel.findOne({username:payload.username})
        if(!user){
            return res.status(401).json({msg:"You are not a authorized user Contact Admin"})
        }
        if(payload.password!=user.password){
            return res.status(202).json({msg:"credentials are wrong"})
        }
        res.status(201).send({"User Login successful":user})
       
        
    } catch (error) {
        
    }
})

module.exports=userRouter