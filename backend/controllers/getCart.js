const User = require("../models/user");

const getCart = async (req, res) => {
    const userId = req.user?._id;

    try {
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ cart: user.cart });
    } catch (err) {
        console.error("Error in getCart:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getCart };
