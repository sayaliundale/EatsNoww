import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id, name, price, img } = action.payload;
      if (!state.value[id] || typeof state.value[id] !== "object") {
        state.value[id] = { id, name, price, img, quantity: 1 };
      } else {
        state.value[id].quantity += 1;
      }
    },

    decrement: (state, action) => {
      const { id } = action.payload;
      if (state.value[id]) {
        if (state.value[id].quantity > 1) {
          state.value[id].quantity -= 1;
        } else {
          delete state.value[id];
        }
      }
    },
    setCart: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        const obj = {};
        payload.forEach((item) => {
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
        state.value = obj;
      } else if (payload && typeof payload === "object") {
        state.value = payload;
      } else {
        state.value = {};
      }
      console.log("✅ setCart ->", state.value);
    }
  }
});

export const { increment, decrement, setCart } = counterSlice.actions;
export default counterSlice.reducer;

export const totalQuantity = (state) =>
  Object.values(state.counter.value).reduce((total, item) => total + (item.quantity || 0), 0);
