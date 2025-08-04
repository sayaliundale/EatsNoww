import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from '../Features/CounterSlice';
import UserSlice from '../Features/UserSlice';

const store = configureStore({
  reducer: {
   counter: CounterSlice,
   user: UserSlice
  },
});

export default store;
