const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    
    name: {type : String,require: true},
    //max people can board for the room
    maxcount: {type: Number,require: true},

    phonenumber: {type: Number},

    //rent for a night
    rentperday: {type: Number,require: true},

    //set urls for array 
    imageurls: [],

    imageUrl: {type: String},
    
    //store current bookings in array
    currentbookings: [],

    //for room type
    type:{type: String,require: true},

    //for room description
    description: {type: String,require: true}

}, {
    timestamps: true,
}) 


const roomModel = mongoose.model('rooms' , roomSchema)

module.exports = roomModel