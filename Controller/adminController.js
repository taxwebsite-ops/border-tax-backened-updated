

const express = require("express");
const adminModel = require("../Modal/adminModel");
const adminRouter  = express.Router();


adminRouter.post("/createAdmin",async(req,res)=>{

   const payload = req.body;

    try {
        const admin = await adminModel.create(payload);
        res.status(201).send({"Admin created successfully":admin})
        

    } 
    catch (error) {

        res.status(201).send(error.message)
        
    }
})


module.exports=adminRouter