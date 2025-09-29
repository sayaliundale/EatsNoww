import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("online");
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const cartItems = JSON.parse(localStorage.getItem("latestOrder"));

    const handlePayment = async () => {
        if (paymentMethod === "cod") {
            try {
                await axios.post("http://localhost:3000/order", {
                    userId: user._id,
                    items: cartItems.items,
                    totalPrice: cartItems.totalPrice,
                    address: cartItems.address,
                    phone: cartItems.phone,
                    status: "Pending",
                    payment: { method: "COD", status: "pending" },
                });

                toast.success("Order placed! Cash on Delivery selected.", { position: "top-right" });
                navigate("/order");
            } catch (err) {
                console.error("COD order failed:", err);
                toast.error("Failed to place COD order!", { position: "top-right" });
            }
            return;
        }

        try {
            const { data: order } = await axios.post("http://localhost:3000/create-payment",
                { amt: cartItems.totalPrice * 100, });

            const options = {
                key: "rzp_test_RMGTx0gqKZ1pjO",
                amount: order.amount,
                currency: order.currency,
                name: "EatsNow",
                description: "Order Payment",
                order_id: order.id,
                handler: async function (response) {
                    await axios.post("http://localhost:3000/order", {
                        userId: user._id, items: cartItems.items,
                        totalPrice: cartItems.totalPrice,
                        address: cartItems.address,
                        phone: cartItems.phone,
                        payment: {
                            method: "Online",
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            status: "success",
                        },
                    });

                    toast.success("Payment Successful! Order Placed!", { position: "top-right" });
                    navigate("/order");
                },
                prefill: {
                    name: user.name,
                    contact: cartItems.phone,
                    email: user.email,
                },
                theme: { color: "#f97316" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            toast.error("Payment failed. Try again.", { position: "top-right" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">  Payment </h2>

                <div className="mb-4">
                    <p className="text-gray-700 font-medium">Total Amount:</p>
                    <p className="text-gray-900 text-xl font-semibold"> ₹ {cartItems.totalPrice}</p>
                </div>

                <div className="mb-6">
                    <p className="text-gray-700 font-medium mb-2"> Select Payment Method: </p>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio" name="payment" value="online" checked={paymentMethod === "online"}
                                onChange={() => setPaymentMethod("online")} className="accent-orange-500" />{" "}
                            Online Payment
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")} className="accent-orange-500" />{" "}
                            Cash on Delivery </label>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition">
                    {paymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
