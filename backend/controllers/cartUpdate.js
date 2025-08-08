const User = require("../models/user");

const updateCart = async (req, res) => {
    const userId = req.user._id;
    console.log("userId - ", userId)
    const { item, action } = req.body;

    console.log(item);

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
            if (action === "increment") {
                existingItem.quantity += 1;
            }
            else if (action === "decrement") {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    user.cart = user.cart.filter(
                        (cartItem) => String(cartItem.id) !== String(item.id)
                    );
                }
            }
        }
        else {
            user.cart.push({ ...item, quantity: 1 });
        }
        console.log("Existing ", existingItem);
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
