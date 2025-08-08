import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Features/Counter/CounterSlice";
import Counter from "../Features/Counter/Counter";

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

  useEffect(() => {
    let mounted = true;
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getCart", { withCredentials: true });
        if (!mounted) return;
        // If backend returns array -> convert; if object, use as-is
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
    return <p>Your cart is empty.</p>;
  }

  const totalPrice = cartItems.reduce((total, [id, item]) => total + (item.quantity || 0) * item.price, 0);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-[50%]">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
        <div className="flex flex-col gap-6 w-full">
          {cartItems.map(([id, item]) => (
            <div key={id} className="flex justify-between items-start gap-4 px-10 py-4 border-b border-gray-300">
              <div className="w-[70%]">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="mt-2 font-semibold text-gray-800">₹{item.price}</p>
              </div>
              <div className="relative w-[10rem] h-[7rem] rounded-lg mb-4">
                {item.img && <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-md" />}
                <div className="absolute top-[80%] ml-[20%] w-[60%] h-[35%] text-center py-2 text-lime-500 bg-white rounded-md border font-semibold border-gray-300 shadow-md">
                  <Counter id={id} itemData={item} />
                </div>
              </div>
            </div>
          ))}
          <div className="text-right w-full px-10 mt-4 mb-4">
            <p className="text-xl font-bold text-gray-800">Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
