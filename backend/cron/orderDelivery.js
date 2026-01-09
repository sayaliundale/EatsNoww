const cron = require("node-cron");
const Order = require("../models/order");

function startOrderCron(io) {
    cron.schedule("* * * * *", async () => {
        const now = new Date();

        const orders = await Order.find({ status: { $in: ["Pending", "Out of Delivery"] } });

        for (let order of orders) {
            const start = new Date(order.time);
            const newTime = Math.floor((now - start) / 60000);
            let updated = false;

            if (newTime >= 3 && order.status === "Out of Delivery") {
                order.status = "Delivered";
                updated = true;
                console.log("Updating to Delivered");
            } else if (newTime >= 2 && order.status === "Pending") {
                order.status = "Out of Delivery";
                updated = true;
                console.log("Updating to Out for Delivery");
            }

            if (updated) {
                await order.save();
                io.to(order.userId.toString()).emit("orderUpdate", order);
                console.log(`Order ${order._id} updated → ${order.status}`);
            }
        }
    });
}

module.exports = { startOrderCron };
