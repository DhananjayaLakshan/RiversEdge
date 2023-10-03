const mongoose = require("mongoose")

var mongoURT = 'mongodb+srv://dhana1234:dhana1234@cluster0.lxgr1rp.mongodb.net/dhana1234'

mongoose.connect(mongoURT , {useUnifiedTopology : true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', () => {
    console.log("MOngoDB Connection Failed...");
})

connection.on('connected', () => {
    console.log('MongoDB connection Successful...');
})

module.exports = mongoose