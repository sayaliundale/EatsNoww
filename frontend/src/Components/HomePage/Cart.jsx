import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.counter.value); // rename slice to 'cart' for clarity if possible

  const cartItems = Object.entries(cart || {}); 
  console.log("CCART- ", cartItems)

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.map(([id, item]) => (
        <div key={id} className="cart-item border p-4 mb-2 rounded shadow-sm">
          <h3 className="font-semibold">{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
