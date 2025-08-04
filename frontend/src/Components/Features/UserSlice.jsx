import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
        if (!action.payload || !action.payload._id) {
            console.error("Invalid payload passed to setUser:", action.payload);
            return;
          }
          state._id = action.payload._id;
          state.name = action.payload.name;
          state.email = action.payload.email;
    },
    clearUser: (state) => {
      state._id = null;
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
