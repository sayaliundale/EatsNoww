import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const Order = ({ order }) => {

    const getInitialTime = () => {
        if (order.status === "Delivered") return 0;
        if (order.status === "Out of Delivery") return 1;
        return 3;
    };
    const [time, setTime] = useState(getInitialTime);
    const [status, setStatus] = useState(order.status || "Pending");
  
    useEffect(() => {
        if (status === "Delivered" || time === 0) return;
  
        const interval = setInterval(() => {
        setTime(prev => {
            const newTime = prev - 1;
  
            if (newTime <= 0) {
                clearInterval(interval);
                console.log("Delivered ✅ Removing from localStorage");
                setStatus("Delivered");
                localStorage.removeItem("latestOrder");
                return 0;
            }
  
            if (newTime === 1) {
                setStatus("Out of Delivery");
            } else if (newTime >= 2) {
                setStatus("Pending");
            }
  
            return newTime;
        });
    }, 60000); 
  
    return () => clearInterval(interval);
    }, [status, time]); 

    return (
        <>
            <div key={order._id}
                className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-200">
                {status !== "Delivered" && (
                    <div className="flex justify-end mb-4">
                        <span className="bg-orange-100 text-orange-400 px-3 py-1 rounded-full text-[0.9rem] font-semibold">
                            Delivery in <span className="text-red-400 text-[1rem]">{time} </span> mins
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-center mb-4">
                    <span
                        className={`px-3 py-1 rounded-full text-[0.8rem] sm:text-sm font-medium ${order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Out of Delivery"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                        {order.status}
                    </span>
                    <span className="text-[0.7rem] sm:text-sm text-gray-500">
                        Order ID: {order._id}
                    </span>
                </div>

                <div className="space-y-2">
                    {order.items?.map((it, i) => (
                        <div key={i} className="flex justify-between items-center text-[0.9rem] sm:text-sm md:text-[1.1rem]">
                            <span className=" text-gray-800 font-medium">{it.name}</span>
                            <span className="text-gray-600">
                                {it.quantity} × ₹{it.price}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-3 flex justify-between items-center text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]">
                    <span className="font-semibold text-gray-800">Total Price</span>
                    <span className="font-bold text-green-600">
                        ₹{order.totalPrice}
                    </span>
                </div>
            </div>

        </>
    )
}

export default Order;