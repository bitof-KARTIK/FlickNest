import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './myreducers/movieSlice';
import tvReducer from './myreducers/tvSlice';
import personReducer from './myreducers/personSlice';


export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})