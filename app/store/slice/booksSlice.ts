import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BooksState = {
  books: BookItem[];
  count: number;
};

const initialState: BooksState = {
  books: [],
  count: 0,
};

const BooksSlice = createSlice({
  name: "BooksData",
  initialState,
  reducers: {
    addBooks(state, action: PayloadAction<BookItem>) {
      state.books.push(action.payload);
    },
    deleteBooks(state) {
      state.books = [];
    },
    addCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { addBooks, deleteBooks, addCount } = BooksSlice.actions;
export default BooksSlice.reducer;
