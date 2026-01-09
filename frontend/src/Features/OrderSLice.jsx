import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: []
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.unshift(action.payload); 
        },
        updateOrder: (state, action) => {
            const index = state.orders.findIndex(o => o._id === action.payload._id);
            if (index !== -1) state.orders[index] = action.payload;
        }
    }
});

export const { setOrders, addOrder, updateOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
