const mongoose = require("mongoose")
const userModel = require("./user")

const servicesSchema = mongoose.Schema({
    title       :{type:String, require:true},
    description :{type:String, require:true},
    imageUrl    :{type:String, require:true}
},{
    timestamps : true,
})

const servicesModel = mongoose.model('services', servicesSchema)
module.exports = servicesModel