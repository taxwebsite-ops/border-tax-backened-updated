const mongoose = require("mongoose")

const connectDb  = mongoose.connect("mongodb+srv://gaurbhaiya:gaur@gaur.ewadmvd.mongodb.net/BordertaxGaur")

module.exports=connectDb