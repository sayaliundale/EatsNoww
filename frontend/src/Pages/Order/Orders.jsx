import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../utils/Socket";
import Order from "./Order";
const API_URL = import.meta.env.VITE_API_URL;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${API_URL}/getOrder/${userId}`,
                    { withCredentials: true });
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        fetchOrders();

        const joinRoom = () => socket.emit("joinOrdersRoom", userId);
        if (socket.connected) joinRoom();
        socket.on("connect", joinRoom);

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
                    if (prev[index].status !== updated.status) {
                        const copy = [...prev];
                        copy[index] = { ...copy[index], ...updated };
                        console.log("Order updated:", updated);
                        return copy;
                    }
                    return prev;
                }
                return [updated, ...prev];
            });
        };
        socket.on("orderUpdate", handleUpdate);

        return () => {
            socket.off("connect", joinRoom);
            socket.off("orderPlaced", handleNewOrder);
            socket.off("orderUpdate", handleUpdate);
        };
    }, [userId]);

    const pendingOrders = orders.filter(
        (o) => o.status?.toLowerCase() === "pending"
    );

    const activeOrders = orders.filter((o) =>
        ["preparing", "out of delivery"].includes(o.status?.toLowerCase()) 
    );

    const completedOrders = orders.filter((o) =>
        ["delivered", "cancelled"].includes(o.status?.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <p className="text-[1rem] md:text-2xl font-bold text-gray-800">
                🍽 Your Orders
            </p>

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
                    <h3 className="text-xl font-semibold text-blue-600">🚚 Active</h3>
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
