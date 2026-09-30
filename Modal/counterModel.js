const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  state: { type: String, required: true, unique: true },
  seq: { type: Number, required: true },
});

module.exports = mongoose.model('Counter', counterSchema);
