import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}  // holds quantity by item id
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id, name, price, img } = action.payload;
    
      if (!state.value[id] || typeof state.value[id] !== "object") {
        state.value[id] = {
          name,
          price,
          img,
          quantity: 1,
        };
      } else {
        state.value[id].quantity += 1;
      }
    },
    

    decrement: (state, action) => {
      const id = action.payload;
    
      if (state.value[id] && state.value[id].quantity > 1) {
        state.value[id].quantity -= 1;
      } else {
        delete state.value[id]; // remove item if quantity drops to 0
      }
    },
    
    setQuantity: (state, action) => {
      const { id, name, price, img, quantity } = action.payload;

      // If current entry is not an object, or not initialized — reinitialize it properly
      if (typeof state.value[id] !== 'object' || state.value[id] === null) {
        state.value[id] = {
          name: name || "",
          price: price || 0,
          img: img || "",
          quantity: quantity || 1,
        };
      } else {
        // It's an object; safely update quantity
        state.value[id].quantity = quantity;
      }
    }

  }
});

export const { increment, decrement, setQuantity } = counterSlice.actions;
export default counterSlice.reducer;
export const totalQuantity = (state) =>
  Object.values(state.counter.value).reduce((total, item) => total + item.quantity, 0);