import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./books/book.api";
import booksReducer from "./slice/books.slice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    booksSlice: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
