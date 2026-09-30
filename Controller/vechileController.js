const express = require('express');
const vehicleModel = require('../Modal/borderTaxModel.js');
const counterModel = require('../Modal/counterModel.js');
const vehicleRouter = express.Router();

// Receipt number prefix per state, and each state's own sequence counter
// (all counters start at 21825952 and increment independently, per state)
function getStatePrefix(state) {
  const s = (state || '').toLowerCase();
  if (s.includes('haryana')) return { key: 'haryana', prefix: 'HRR' };
  if (s.includes('uttarakhand') || s === 'uk') return { key: 'uttarakhand', prefix: 'UKT' };
  if (s.includes('punjab')) return { key: 'punjab', prefix: 'PBR' };
  if (s.includes('madhya') || s === 'mp') return { key: 'mp', prefix: 'MPT' };
  if (s.includes('rajasthan')) return { key: 'rajasthan', prefix: 'RJT' };
  if (s.includes('up') || s.includes('uttar pradesh')) return { key: 'up', prefix: 'UPT' };
  return null;
}

async function getNextSeq(stateKey) {
  let doc = await counterModel.findOneAndUpdate(
    { state: stateKey },
    { $inc: { seq: 1 } },
    { new: true }
  );
  if (!doc) {
    try {
      doc = await counterModel.create({ state: stateKey, seq: 21825952 });
    } catch (e) {
      // another request created it first between our find and create; just increment now
      doc = await counterModel.findOneAndUpdate(
        { state: stateKey },
        { $inc: { seq: 1 } },
        { new: true }
      );
    }
  }
  return doc.seq;
}

function todayYYMMDD() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

// POST: Create a new vehicle
vehicleRouter.post('/createVehicle', async (req, res) => {
  const payload = req.body;

  try {
    const stateInfo = getStatePrefix(payload.state);
    if (stateInfo) {
      const seq = await getNextSeq(stateInfo.key);
      payload.uptNumber = `${stateInfo.prefix}${todayYYMMDD()}${seq}`;
    }

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
