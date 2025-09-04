const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to send SMS using Fast2SMS
router.post('/send-sms', async (req, res) => {
  const { vehicleNo, mobileNo, totalAmount, taxFromDate, taxUptoDate } = req.body;

  // Construct the SMS message
  const smsMessage = `Your tax of Rs. ${totalAmount}/- has been paid for Vehicle No. ${vehicleNo}, valid from ${taxFromDate} 12:00 AM to ${taxUptoDate} 12:00 AM paid on ${new Date().toLocaleString()}. UVAHAN`;

  // Fast2SMS POST API details
  const apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
  const headers = {
    authorization: 'PN3wsGupLU1dJsadbRvmZaHSxurM61Cxj7uEkxbdHKvSWB841ph7XnEnY89k',
    'Content-Type': 'application/json'
  };

  const data = {
    route: "dlt",
    sender_id: "VAHAN",
    message: smsMessage,
    variables_values: "",
    schedule_time: "", 
    flash: 0,
    numbers: mobileNo
  };

  try {
    // Send SMS using POST request
    const response = await axios.post(apiUrl, data, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
});

module.exports = router;
