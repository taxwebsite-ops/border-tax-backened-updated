const express = require('express');
const axios = require('axios');
const router = express.Router();

// Assuming you already have the `userController.js` file set up

// Route to send SMS
router.post('/send-sms', async (req, res) => {
  const { vehicleNo, mobileNo, totalAmount, taxFromDate, taxUptoDate } = req.body;

  // Construct the SMS message
  const smsMessage = `Your tax of Rs. ${totalAmount}/- has been paid for Vehicle No. ${vehicleNo}, valid from ${taxFromDate} 12:00 AM to ${taxUptoDate} 12:00 AM paid on ${new Date().toLocaleString()}. UVAHAN`;

  // RedSMS API URL (ensure the correct template ID is used)
  const apiUrl = `https://login.redsms.in/api/smsapi?key=c2c84407ebb090fc094fc169192f9cc8&route=2&sender=UVAHAN&number=${mobileNo}&sms=${encodeURIComponent(smsMessage)}&templateid=1207163490769304299`;

  try {
    // Send the SMS request to RedSMS API using Axios
    const response = await axios.get(apiUrl);

    // Send back the API response
    res.json(response.data);
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
});

module.exports = router;
