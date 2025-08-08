import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from '../Features/Counter/CounterSlice';
import userReducer from "../Features/UserSlice"

const store = configureStore({
  reducer: {
    counter: CounterSlice,
    user: userReducer
  },
});

export default store;
