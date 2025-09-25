import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "./CounterSlice";

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

const Counter = ({ id, itemData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeQty = async (actionType) => {
    if (loading) return;
    setLoading(true);
    try {
      const payloadItem = {
        id: itemData.id ?? id,
        name: itemData.name,
        price: itemData.price,
        img: itemData.img
      };

      const res = await axios.post(
        "http://localhost:3000/cartUpdate",
        { item: payloadItem, action: actionType },
        { withCredentials: true }
      );

      if (res.data && res.data.cart) {
        const cartObj = Array.isArray(res.data.cart) ? arrayToCartObject(res.data.cart) : res.data.cart;
        dispatch(setCart(cartObj));
      } else {
        dispatch(setCart({}));
      }
    } catch (err) {
      console.error("Cart update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-evenly gap-2 px-2 text-[0.9rem] sm:px-3 sm:text-[1rem] sm:gap-3 md:px-4 ">

      <button onClick={() => changeQty("decrement")} disabled={loading}>-</button>
      <span>{itemData.quantity ?? 0}</span>
      <button onClick={() => changeQty("increment")} disabled={loading}>+</button>

    </div>
  );
};

export default Counter;
