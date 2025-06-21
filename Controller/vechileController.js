const express = require('express');
const vehicleModel = require('../Modal/borderTaxModel.js');
const vehicleRouter = express.Router();

// POST: Create a new vehicle
vehicleRouter.post('/createVehicle', async (req, res) => {
  const payload = req.body;

  try {
  
    const newVehicle = await vehicleModel.create(payload);
    res.status(200).send(newVehicle);  
  } catch (error) {
    res.status(401).json({ msg: error.message });  
  }
});

// GET: Get all vehicles
// /vechile//getVehicles
vehicleRouter.get('/getVehicles', async (req, res) => {
  try {
    const vehicles = await vehicleModel.find(); 
    res.status(200).json(vehicles);  
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching vehicle data', error: error.message });  // Handle error in fetching data
  }
});


vehicleRouter.get('/getVehiclesByAdmin', async (req, res) => {
    const { adminName } = req.query;  
  
    if (!adminName) {
      return res.status(400).json({ msg: 'Admin name is required' });  // If no adminName is provided
    }
  
    try {
      const vehicles = await vehicleModel.find({ adminName });  // Find vehicles by adminName
  
      if (vehicles.length === 0) {
        return res.status(404).json({ msg: `No data found for admin: ${adminName}` });  // If no vehicles are found
      }
  
      res.status(200).json(vehicles);  // Return the vehicles for the specific admin
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching vehicle data', error: error.message });  // Handle error in fetching data
    }
  });



vehicleRouter.get("/:id",async(req,res)=>{
  const {id} = req.params;
  console.log(id)
  try {

    const vehicle = await vehicleModel.findById(id).lean().exec();
    if (!vehicle) {
      return res.status(404).send({ message: "Vehicle not found" });
    }
    res.status(200).send(vehicle);
    
  } catch (error) {
    res.status(500).send(error.message);
    
  }
})

module.exports = vehicleRouter;
