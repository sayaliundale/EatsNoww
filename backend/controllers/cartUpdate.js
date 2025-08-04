const User = require("../models/user");

const updateCart = async (req, res) => {
    const userId = req.user?._id;
    const { item } = req.body;

    if (!item || !item.id) {
        return res.status(400).json({ error: "Item data is missing or invalid" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const existingItem = user.cart.find(
            (cartItem) => String(cartItem.id) === String(item.id)
        );

        if (existingItem) {
            existingItem.quantity = item.quantity;

            if (existingItem.quantity <= 0) {
                user.cart = user.cart.filter(
                    (cartItem) => String(cartItem.id) !== String(item.id)
                );
            }
        } else {
            if (item.quantity > 0) {
                user.cart.push(item);
            }
        }

        await user.save();
        return res
            .status(200)
            .json({ message: "Cart updated successfully", cart: user.cart });
    } catch (err) {
        console.error("Cart update error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { updateCart };
