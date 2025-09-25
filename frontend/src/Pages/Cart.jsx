import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Features/Counter/CounterSlice";
import Counter from "../Features/Counter/Counter";
import { addOrder } from "../Features/OrderSLice";

const arrayToCartObject = (arr) => {
    const obj = {};
   
    arr.forEach((item) => {
        const key = item.id ?? item._id;
        if (!key) return;
        obj[key] = {
            id: item.id ?? item._id,
            name: item.name,
            price: item.price,
            img: item.img,
            quantity: Number(item.quantity) || 1
        };
    });
    return obj;
};

const Cart = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const cartObject = useSelector((state) => state.counter.value);
    const cartItems = useMemo(() => Object.entries(cartObject), [cartObject]);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");

    useEffect(() => {

        let mounted = true;
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:3000/getCart", { withCredentials: true });
                
                if (!mounted) return;
                
                if (Array.isArray(res.data.cart)) {
                    dispatch(setCart(arrayToCartObject(res.data.cart)));
                } else if (res.data.cart && typeof res.data.cart === "object") {
                    dispatch(setCart(res.data.cart));
    
                } else {
                    dispatch(setCart({}));
                }
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCart();
        return () => { mounted = false; };
    }, [dispatch, userId]);     

    if (cartItems.length === 0) {
        return <div className="flex justify-center h-screen items-center text-3xl">Your cart is empty.</div>;
    }

    const totalPrice = cartItems.reduce(
        (total, [id, item]) => total + (item.quantity || 0) * item.price,
        0
    );
    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            userId,
            totalPrice, fullName, phone, address, city, pincode,
            items: cartItems.map(([id, item]) => ({
                id: item.id, name: item.name,
                price: item.price, quantity: item.quantity
            }))
            
        };

        try {
            const res = await axios.post("http://localhost:3000/order", orderData, {
                withCredentials: true
            });
            const newOrder = res.data;
            if (res.status === 200) {
                alert("Order placed successfully!");
                dispatch(addOrder(newOrder));
                dispatch(setCart({}));
            }
            localStorage.setItem("latestOrder", JSON.stringify(res.data));
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place order");
        }
    };

    return (
        <div className="flex flex-col items-center md:justify-evenly md:flex-row mt-10">
          
            <div className="w-[70%] md:w-[40%] lg:w-[30%]">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Your Order</h2>
                <div className="flex flex-col gap-6 w-full">
                    {cartItems.map(([id, item]) => (
                        
                        <div key={id} className="flex justify-between items-start gap-4 px-10 py-4 border-b border-gray-300">
                            <div className="w-[70%]">
                                <p className="text-[0.9rem] md:text-lg font-semibold text-gray-900">{item.name}</p>
                                <p className="text-[0.9rem] md:text-lg mt-2 font-semibold text-gray-800">₹{item.price}</p>
                            </div>
                            <div className="relative w-[7rem] h-[5rem] md:w-[8.5rem] md:h-[6.5rem] rounded-lg mb-4">
                                {item.img && <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-md" />}
                                <div className="absolute top-[80%] ml-[20%] w-[60%] h-[35%] text-center py-2 text-lime-500 bg-white rounded-md border font-semibold border-gray-300 shadow-md">
                                    <Counter id={id} itemData={item} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-right w-full px-10 mt-4 mb-4">
                        <p className="text-[1rem] md:text-xl font-bold text-gray-800">Total Price: ₹{totalPrice}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white w-[60%] md:w-[30%] lg:w-[28%] border-[1px] border-stone-200 shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">Add Address</h2>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <input type="text" placeholder="Full Name"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-[0.8rem] md:text-[1rem]" 
                        required/>

                    <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}"
                        value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-[0.8rem] md:text-[1rem]"
                        required/>

                    <textarea placeholder="Address"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-[0.8rem] md:text-[1rem]"
                        rows="3" required></textarea>

                    <div className="flex gap-4">
                        <input type="text" placeholder="City"
                            value={city} onChange={(e) => setCity(e.target.value)}
                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-[0.8rem] md:text-[1rem]"
                            required/>
                        <input type="text" placeholder="Pincode" pattern="[0-9]{6}"
                            value={pincode} onChange={(e) => setPincode(e.target.value)}
                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-[0.8rem] md:text-[1rem]"
                            required/>
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-[0.8rem] md:text-[1rem]">
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Cart;
