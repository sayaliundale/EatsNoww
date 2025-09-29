const orderSchema = require("../models/order")
const User = require("../models/user")

const order = async (req, res) => {
    const { name, totalPrice, items, address, phone, userId, payment } = req.body;

    try {
        const newOrder = new orderSchema({
            name, userId, totalPrice, items, address, phone, status: 'Pending', payment
        });

        await newOrder.save();

        const io = req.app.get("io");
        io.emit("newOrder", newOrder);
        io.to(userId.toString()).emit("orderPlaced", newOrder);

        await User.findByIdAndUpdate(userId,  { cart: [] });

        res.status(200).json(newOrder); 
    } catch (err) {
        console.error(err);
        res.status(400).send("Problem in order creation!");
    }
};

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
        
        const order = await orderSchema.findById(req.params._id);
        if (!order) return res.status(404).send("Order not found");

        order.status = status;

        if (order.payment.method === "COD" && status === "Delivered") {
            order.payment.status = "success";
        }

        await order.save()
        const io = req.app.get("io");
        io.to(order.userId.toString()).emit("orderUpdate", order);

        res.json(order);

    } catch (err) {
        res.status(500).send("Error updating status");
    }
};


const getOrder = async (req, res) => {
    const userId = req.params.id;

    try {
        const orders = await orderSchema.find({ userId }).sort({ _id: -1 });
        res.json(orders);
    }
    catch (err) {
        res.status(400).send("Error in fetching order")
    }
}
module.exports = { order, getOrders, orderStatus, getOrder }