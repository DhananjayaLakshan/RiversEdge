const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({

    room: {
        type: String,require: true
    },
    roomid: {
        type: String,require: true
    },
    userid: {
        type: String, require: true
    },
    userName:{
        type: String, require: true
    },
    email:{
        type: String, require: true
    },
    address:{
        type: String, require: true
    },
    phonenumber:{
        type: Number, require: true
    },
    fromdate: {
        type: String,require: true
    },
    todate: {
        type: String,require: true
    },
    totalamount: {
        type: Number,require: true
    },
    totaldays: {
        type: Number,require: true
    },
    transactionId : {
        type: String,require: true
    },
    status: {
        type: String,require: true, default: 'booked'
    }   

}, {
    timestamps: true,
})

const bookingmodel = mongoose.model('bookings', bookingSchema)//bookings is collection name

module.exports = bookingmodel
