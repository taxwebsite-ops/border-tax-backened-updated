const mongoose = require("mongoose")

const connectDb  = mongoose.connect("mongodb://localhost:27017/BorderTax")

module.exports=connectDb