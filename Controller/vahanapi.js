const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to send SMS using Fast2SMS
router.post('/send-sms', async (req, res) => {
  const { vehicleNo, mobileNo, totalAmount, taxFromDate, taxUptoDate, uptNumber } = req.body;
  // DLT template 190538: "...receipt no. UPT{#var#} and valid upto {#var#} 12:00 AM..." (UPT is fixed text)
  const receiptSuffix = String(uptNumber || '').replace(/^UPT/i, '');

  // Construct the SMS message
  const smsMessage = `Your tax of Rs. ${totalAmount}/- has been paid for Vehicle No. ${vehicleNo}, valid from ${taxFromDate} 12:00 AM to ${taxUptoDate} 12:00 AM paid on ${new Date().toLocaleString()}. UVAHAN`;

  // Fast2SMS POST API details
  const apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
  const headers = {
    authorization: process.env.FAST2SMS_API_KEY,
    'Content-Type': 'application/json'
  };

  const templateId = process.env.FAST2SMS_TEMPLATE_ID;
  const senderId = process.env.FAST2SMS_SENDER_ID || 'VAHAN';

  // Fast2SMS's "dlt" route requires `message` to be the numeric DLT-approved
  // Template/Message ID (not free text), with variables_values filling the
  // template's placeholders in order. Until FAST2SMS_TEMPLATE_ID is set in
  // .env, fall back to the non-DLT "q" (Quick SMS) route so sending still
  // works for testing.
  const data = templateId
    ? {
        route: 'dlt',
        sender_id: senderId,
        message: templateId,
        variables_values: `${receiptSuffix}|${taxUptoDate}`,
        schedule_time: '',
        flash: 0,
        numbers: mobileNo,
      }
    : {
        route: 'q',
        message: smsMessage,
        language: 'english',
        flash: 0,
        numbers: mobileNo,
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
