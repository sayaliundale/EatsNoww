const orderSchema = require("../models/order")
const User = require("../models/user")

const order = async (req, res) => {
    const { name, totalPrice, items, address, phone, userId } = req.body;

    try {
        const newOrder = new orderSchema({
            name, userId, totalPrice, items, address, phone, status: 'Pending'
        })
        await newOrder.save();
        
        const io = req.app.get("io");
        io.to(req.body.userId).emit("orderUpdate", newOrder);
        
        await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
        res.status(200).send("Order created!");
    }
    catch (err) {
        res.status(400).send("Problem in order creation!")
    }
}

const getOrders = async (req, res) => {
    try {
        const data = await orderSchema.find({}).sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error in fetching orders");
    }
};

const orderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        console.log(status);

        const order = await orderSchema.findByIdAndUpdate(
            req.params._id,
            { status },
            { new: true }
        );

        const io = req.app.get("io");
        io.to(order.userId.toString()).emit("orderUpdate", order);

        res.json(order);
    } catch (err) {
        res.status(500).send("Error updating status");
    }
}

const getOrder = async (req, res) => {
    const userId = req.params.id;

    try {
        const orders = await orderSchema.find({ userId });
        res.json(orders);
    }
    catch (err) {
        res.status(400).send("Error in fetching order")
    }
}
module.exports = { order, getOrders, orderStatus, getOrder }