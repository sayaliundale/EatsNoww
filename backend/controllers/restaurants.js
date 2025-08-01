const Restaurant = require("../models/restaurant");

const restaurant = async (req, res) => {
    try {
        const data = await Restaurant.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error in fetching restaurant data' });
    }
};

module.exports = restaurant;
