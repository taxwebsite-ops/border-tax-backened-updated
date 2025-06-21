
// const express =require("express")
// const userModel = require("../Modal/userModal.js")
// const userRouter = express.Router()


// userRouter.post("/createUser",async(req,res)=>{

//     const payload  = req.body;
//     try {
//         const existingUser  = await userModel.findOne({username:payload.username})
//         console.log(existingUser)
//         if (existingUser) {
//             return res.status(409).json({ msg: "User already exists" });
//         }

//         const user = await userModel.create(payload);
//         res.status(200).send(user)
        
//     } catch (error) {
//         res.status(401).json({msg:error.message})
        
//     }

// })


// userRouter.post("/loginUser",async(req,res)=>{

//     const payload  = req.body;
//     try {

//         const user = await userModel.findOne({username:payload.username})
//         if(!user){
//             return res.status(401).json({msg:"You are not a authorized user Contact Admin"})
//         }
//         if(payload.password!=user.password){
//             return res.status(202).json({msg:"credentials are wrong"})
//         }
//         res.status(200).send(user)
       
        
//     } catch (error) {
        
//     }
// })

// module.exports=userRouter


const express = require("express");
const userModel = require("../Modal/userModal.js");
const userRouter = express.Router();

// Create User
userRouter.post("/createUser", async (req, res) => {
    const payload = req.body;
    try {
        const existingUser = await userModel.findOne({ username: payload.username });
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const user = await userModel.create(payload);
        res.status(200).send(user);
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
});

// Login User
userRouter.post("/loginUser", async (req, res) => {
    const payload = req.body;
    try {
        const user = await userModel.findOne({ username: payload.username });
        if (!user) {
            return res.status(401).json({ msg: "You are not an authorized user. Contact Admin" });
        }
        if (payload.password !== user.password) {
            return res.status(202).json({ msg: "Credentials are wrong" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Get All Users
// /user/getAllUsers
userRouter.get("/getAllUsers", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Delete User
userRouter.delete("/deleteUser/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Update User
userRouter.put("/updateUser/:id", async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, updatePayload, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = userRouter;
