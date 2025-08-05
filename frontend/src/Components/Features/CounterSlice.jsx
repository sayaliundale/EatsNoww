import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}  
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setInitialCart: (state, action) => {
      const cartArray = action.payload;
      const newValue = {};
      cartArray.forEach((item) => {
        newValue[item.id] = {
          name: item.name,
          price: item.price,
          img: item.img,
          quantity: item.quantity,
        };
      });
      state.value = newValue;
    },
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
      const { id } = action.payload;
    
      if (state.value[id]) {
        if (state.value[id].quantity > 1) {
          state.value[id].quantity -= 1;
        } else {
          
          delete state.value[id];
        }
      }
    },
    
    setQuantity: (state, action) => {
      const { id, name, price, img, quantity } = action.payload;

      if (typeof state.value[id] !== 'object' || state.value[id] === null) {
        state.value[id] = {
          name: name || "",
          price: price || 0,
          img: img || "",
          quantity: quantity || 1,
        };
      } else {
        
        state.value[id].quantity = quantity;
      }
    }

  }
});

export const { increment, decrement, setQuantity, setInitialCart } = counterSlice.actions;
export default counterSlice.reducer;

export const totalQuantity = (state) =>
  Object.values(state.counter.value).reduce((total, item) => total + item.quantity, 0);
