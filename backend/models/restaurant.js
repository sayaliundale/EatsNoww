const mongoose = require("mongoose");

const restaurant_data = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    res_id: {
        type: Number,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        default: 0
    },
    del_time: {
        type: String, 
        required: true

    },
    veg: {
        type: Boolean,
        required: true

    },
    res_img: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model("Restaurant_data", restaurant_data, "restaurant_data");