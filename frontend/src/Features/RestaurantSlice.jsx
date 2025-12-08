import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRestaurants } = restaurantsSlice.actions;
export const selectRestaurants = (state) => state.restaurants.data;
export default restaurantsSlice.reducer;
