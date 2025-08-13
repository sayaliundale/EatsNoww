const mongoose = require("mongoose");

const order = new mongoose.Schema({
   userId :{
        type : String
   },
    fullName: {
        type: String
    },
    items: {
        type: Array
    },
    totalPrice: {
        type: Number
    },
    address: {
       type :String
    },
    phone :{
        type : Number
    },
    pincode:{
        type : Number
    },
    status: {
        type: String,
        default: 'Pending'
    },
    city :{
        type: String
    }

})

module.exports = mongoose.model("Order", order)