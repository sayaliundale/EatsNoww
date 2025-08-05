import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./CounterSlice";
import { useEffect } from "react";
import axios from "axios";

const Counter = ({ id, itemData, userId }) => {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.counter.value[id]);
  const count = item?.quantity || 0;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!userId || count < 0) return;

      const syncCart = async () => {
        try {
          await axios.post("http://localhost:3000/cartUpdate", {
            item: {
              id,
              name: itemData.name,
              price: itemData.price,
              img: itemData.img,
              quantity: count,
            },
          }, { withCredentials: true });
        } catch (err) {
          console.error("Cart sync failed:", err);
        }
      };

      syncCart();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [count]);


  return (
    <div className="flex items-center justify-evenly">
      <button
        onClick={() =>
          dispatch(
            increment({
              id,
              name: itemData.name,
              price: itemData.price,
              img: itemData.img,
            })
          )
        }>
        +
      </button>
      <span className="text-lg font-bold">{count}</span>

      <button onClick={() =>
        dispatch(decrement({ id }))}>
        -
      </button>
    </div>
  );
};

export default Counter;
