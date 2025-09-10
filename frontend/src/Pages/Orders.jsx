import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../utils/Socket";
import Order from "./Order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/getOrder/${userId}`,
                    { withCredentials: true }
                );
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        fetchOrders();

        if (socket.connected) {
            socket.emit("joinOrdersRoom", userId);
        } else {
            socket.on("connect", () => {
                socket.emit("joinOrdersRoom", userId);
            });
        }

        const handleNewOrder = (newOrder) => {
           
            setOrders((prev) => {
                if (prev.some((o) => o._id === newOrder._id)) return prev;
                return [newOrder, ...prev];
            });
        };
        socket.on("orderPlaced", handleNewOrder);

        const handleUpdate = (updated) => {
            setOrders((prev) => {
                const index = prev.findIndex((o) => o._id === updated._id);
                if (index !== -1) {
                    const copy = [...prev];
                    copy[index] = updated;
                    return copy;
                }
                return [updated, ...prev];
            });
        };
        socket.on("orderUpdate", handleUpdate);

        return () => {
            socket.off("orderPlaced", handleNewOrder);
            socket.off("orderUpdate", handleUpdate);
        };
    }, [userId]);

    const pendingOrders = orders.filter(
        (o) => o.status?.toLowerCase() === "pending");

    const activeOrders = orders.filter((o) =>
        ["preparing", "out of delivery"].includes(o.status?.toLowerCase()));

    const completedOrders = orders.filter((o) =>
        ["delivered", "cancelled"].includes(o.status?.toLowerCase()));

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">🍽 Your Orders</h2>

            {orders.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>No orders yet. Start adding delicious items!</p>
                </div>
            )}

            {pendingOrders.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-yellow-600">🕒 Placed</h3>
                    {pendingOrders.map((order) => (
                        <Order key={order._id} order={order} />
                    ))}
                </>
            )}

            {activeOrders.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-blue-600">🚚 Out of Delivery</h3>
                    {activeOrders.map((order) => (
                        <Order key={order._id} order={order} />
                    ))}
                </>
            )}

            {completedOrders.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-green-600">✅ Completed</h3>
                    {completedOrders.map((order) => (
                        <Order key={order._id} order={order} />
                    ))}
                </>
            )}
        </div>
    );
};

export default Orders;
