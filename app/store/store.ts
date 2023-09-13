import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./books/book.api";
import bookByIdReducer from "./slice/bookByIdSlice";
import searchValuesReducer from "./slice/searchValuesSlice";
import BooksReducer from "./slice/booksSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    bookByIdSlice: bookByIdReducer,
    searchValuesSlice: searchValuesReducer,
    bookSlice: BooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
