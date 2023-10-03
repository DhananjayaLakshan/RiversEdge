const mongoose = require("mongoose")

const packageSchema = mongoose.Schema({

    name: {type: String, require: true},
    description: {type: String, require: true},
    imageUrl: {type: String, require: true},
    price: {type: Number, require: true}
},{
    timestamps: true,
})

const packageModel = mongoose.model('packages' , packageSchema)

module.exports = packageModel