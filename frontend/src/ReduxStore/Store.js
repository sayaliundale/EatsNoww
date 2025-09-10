import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from '../Features/Counter/CounterSlice';
import userReducer from "../Features/UserSlice"
import orderReducer from '../Features/OrderSLice';

const store = configureStore({
  reducer: {
    counter: CounterSlice,
    user: userReducer,
    order: orderReducer
  },
});

export default store;
