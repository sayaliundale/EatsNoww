import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../utils/Socket";
const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {

    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState(null);

    useEffect(() => {

        const fetchOrder = async () => {
            const res = await axios.get(`${API_URL}/getOrders`);
            console.log(res.data);
            setOrders(res.data);
        }
        fetchOrder();

        socket.on("newOrder", (order) => {
            setOrders(prevOrders => [order, ...prevOrders]); 
            setMsg(`New order received from ${order.customerName}`);
        });

        socket.on("orderUpdated", (updatedOrder) => {
            setOrders(prevOrders =>
                prevOrders.map(o =>
                    o._id === updatedOrder._id ? updatedOrder : o
                )
            );
            setMsg(`Order ${updatedOrder._id} updated to "${updatedOrder.status}"`);
        });

        return () => {
            socket.off("newOrder");
            socket.off("orderUpdated");
        };
    
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        
        setOrders(prevOrders =>
            prevOrders.map(o =>
                o._id === orderId ? { ...o, status: newStatus } : o
            )
        );
    
        try {
            const res = await axios.put(
                `${API_URL}/updateStatus/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );
    
            setMsg(`Order ${orderId} status updated to "${res.data.status}"`);
        } catch (err) {
            setMsg(`Failed to update order ${orderId} status.`);
        }
    };
    
    const allowedFlow = ["Preparing", "Out of Delivery", "Delivered", "Cancelled"];

    return (
        <>
            <div>
                <div className="p-4">
                    {msg && (
                        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                            {msg}
                        </div>
                    )}

                    <h2 className="text-2xl font-bold mb-4">All Orders</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Order ID</th>
                                <th className="border px-4 py-2">Address</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Total Price</th>
                                <th className="border px-4 py-2">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>

                                    <td className="border px-4 py-2">{order._id}</td>
                                    <td className="border px-4 py-2">{order.address}</td>
                                    <td className="border px-4 py-2">{order.phone}</td>
                                    <td className="border px-4 py-2">

                                    <select defaultValue={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                                            {allowedFlow.map((statusOption) => (
                                                <option
                                                    key={statusOption}
                                                    value={statusOption}
                                                    disabled={allowedFlow.indexOf(statusOption) < allowedFlow.indexOf(order.status)}>
                                                    {statusOption}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">₹{order.totalPrice}</td>
                                    <td className="border px-4 py-2">
                                        <ul>
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} × {item.quantity} — ₹{item.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminPanel;