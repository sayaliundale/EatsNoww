const Restaurant = require("../models/restaurant");

const restaurant = async (req, res) => {
    try {
        const data = await Restaurant.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error in fetching restaurant data' });
    }
};

const oneRestaurant = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const restaurant = await Restaurant.findOne({ res_id: id });

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (err) {
        res.status(500).send("Error occurred while fetching menu");
    }
}

module.exports = {restaurant, oneRestaurant};
