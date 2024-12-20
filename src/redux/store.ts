import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import movieReducer from "./moviesSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
