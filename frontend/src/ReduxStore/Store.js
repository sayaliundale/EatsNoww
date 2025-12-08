import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from '../Features/Counter/CounterSlice';
import userReducer from "../Features/UserSlice"
import orderReducer from '../Features/OrderSLice';
import restaurantSlice from '../Features/RestaurantSlice';

const store = configureStore({
  reducer: {
    counter: CounterSlice,
    user: userReducer,
    order: orderReducer,
    restaurant : restaurantSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default store;
