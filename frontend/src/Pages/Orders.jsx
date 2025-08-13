import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:3000/getOrder/${userId}`, { withCredentials: true })
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));

        const socket = io("http://localhost:3000", { withCredentials: true });
        socket.emit("joinOrdersRoom", userId);

        socket.on("orderUpdate", (updated) => {
            setOrders(prev => {
                const index = prev.findIndex(order => order._id === updated._id);
                if (index !== -1) {
                    const copy = [...prev];
                    copy[index] = updated;
                    return copy;
                }
                return [updated, ...prev];
            });
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">🍽 Your Orders</h2>

            {orders.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>No orders yet. Start adding delicious items!</p>
                </div>
            )}

            {orders.map(order => (
                <div key={order._id}
                    className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-200">

                    <div className="flex justify-between items-center mb-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Out for Delivery"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}>
                            {order.status}
                        </span>
                        <span className="text-sm text-gray-500">
                            Order ID: {order._id.slice(-6).toUpperCase()}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {order.items?.map((it, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <span className="text-gray-800 font-medium">{it.name}</span>
                                <span className="text-gray-600">
                                    {it.quantity} × ₹{it.price}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-3 flex justify-between items-center">
                        <span className="font-semibold text-gray-800">Total Price</span>
                        <span className="text-lg font-bold text-green-600">
                            ₹{order.totalPrice}
                        </span>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Orders;
