import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/BloggerSlice';

const store = configureStore({
  reducer: {
    users: userSlice, 
  },
});

export default store;
