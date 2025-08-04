const mongoose = require("mongoose");

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            id: {
                type: Number,
                required: true
            },
            name: String,
            img: String,
            price: Number,
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", users, "users");