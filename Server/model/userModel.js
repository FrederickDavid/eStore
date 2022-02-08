const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean, 
            default: false
        },
        image: {
            type: String
        },
        contact: {
            type: Number
        },
    },
    { timestamp: true }
)

module.exports = mongoose.model("user", userModel)