mongoose = require("mongoose")

const storeModel = mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    description: {type: String},
    image: {type: String}
})

module.exports = mongoose.model("store", storeModel)