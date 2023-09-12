import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchBarState {
  value: string;
  searchInputvalue: string;
  category: string;
  order: string;
  startIndex: number;
  id: string;
}

const initialState: SearchBarState = {
  value: "",
  searchInputvalue: "",
  category: "all",
  order: "relevance",
  startIndex: 0,
  id: "",
};

export const booksSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    value(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    inputChange: (state, action: PayloadAction<string>) => {
      state.searchInputvalue = action.payload;
    },
    valueCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    valueOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { value, inputChange, valueCategory, valueOrder, setId } = booksSlice.actions;
export default booksSlice.reducer;
