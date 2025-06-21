

// const express = require("express");
// const adminModel = require("../Modal/adminModel");
// const adminRouter  = express.Router();


// adminRouter.post("/createAdmin",async(req,res)=>{

//    const payload = req.body;

//     try {
//         const admin = await adminModel.create(payload);
//         res.status(201).send({"Admin created successfully":admin}) 

//     } 
//     catch (error) {

//         res.status(201).send(error.message)
        
//     }
// })


// module.exports=adminRouter

const express = require("express");
const adminModel = require("../Modal/adminModel");
const adminRouter = express.Router();


// Get all admins
adminRouter.get("/admins", async (req, res) => {
    try {
        const admins = await adminModel.find();
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
// Create Admin (existing route)
adminRouter.post("/createAdmin", async (req, res) => {
    const payload = req.body;

    try {
        const admin = await adminModel.create(payload);
        res.status(201).send({"Admin created successfully": admin});
    } 
    catch (error) {
        res.status(400).send({error: error.message});
    }
});

// Delete Admin by ID
adminRouter.delete("/deleteAdmin/:id", async (req, res) => {
    try {
        const adminId = req.params.id;
        
        // Find and delete the admin
        const deletedAdmin = await adminModel.findByIdAndDelete(adminId);
        
        if (!deletedAdmin) {
            return res.status(404).send({ message: "Admin not found" });
        }
        
        res.status(200).send({ 
            message: "Admin deleted successfully", 
            deletedAdmin: deletedAdmin 
        });
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Edit/Update Admin by ID
adminRouter.put("/editAdmin/:id", async (req, res) => {
    try {
        const adminId = req.params.id;
        const updatePayload = req.body;
        
        // Find and update the admin
        const updatedAdmin = await adminModel.findByIdAndUpdate(
            adminId, 
            updatePayload, 
            { new: true, runValidators: true }
        );
        
        if (!updatedAdmin) {
            return res.status(404).send({ message: "Admin not found" });
        }
        
        res.status(200).send({ 
            message: "Admin updated successfully", 
            updatedAdmin: updatedAdmin 
        });
    } 
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = adminRouter;