import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../Features/CounterSlice";
import { useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const saveCart = async () => {
      try {
        await axios.post(
          "http://localhost:3000/cartUpdate",
          {
            cart: Object.values(cart),
          },
          {
            withCredentials: true, 
          }
        );
        console.log("Sending to backend:", payload);
      } catch (err) {
        console.error("Error syncing cart:", err);
      }
    };

    saveCart();
  }, [cart]);

  const cartItems = Object.entries(cart || {});
  console.log("CCART- ", cartItems);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }
  const totalPrice = cartItems.reduce((total, [id, item]) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.map(([id, item]) => (
        <div
          key={id}
          className="cart-item border p-4 mb-2 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>Price: ₹{item.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrement({ id }))}>
              -
            </button>
            <span className="font-bold text-lg">{item.quantity}</span>
            <button
              onClick={() =>
                dispatch(
                  increment({
                    id,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                  })
                )
              }
              className="px-3 py-1 bg-green-300 rounded"
            >
              +
            </button>
          </div>
         
        </div>
      ))}
      <div>
        <p>Total Price : {totalPrice}</p>
      </div>
    </div>
  );
};

export default Cart;
