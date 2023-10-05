import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/BloggerSlice';
import articleSlice from './Slices/articleSlice';

const store = configureStore({
  reducer: {
    users: userSlice, 
    articles: articleSlice,
  },
});

export default store;