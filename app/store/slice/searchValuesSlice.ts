import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  values: SearchValues;
};

const initialState: SearchState = {
  values: {
    searchValue: "",
    category: "all",
    order: "relevance",
    startIndex: 0,
  },
};

const searchValuesSlice = createSlice({
  name: "SearchState",
  initialState,
  reducers: {
    changeSearchValue(state, action: PayloadAction<string>) {
      state.values.searchValue = action.payload;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.values.category = action.payload;
    },
    changeOrder(state, action: PayloadAction<string>) {
      state.values.order = action.payload;
    },
    clearState(state) {
      state.values = initialState.values;
    },
    clearStartIndex(state) {
      state.values.startIndex = 0;
    },
    changeStartIndex(state) {
      state.values.startIndex += 30;
    },
  },
});

export const {
  changeSearchValue,
  changeCategory,
  changeOrder,
  clearState,
  clearStartIndex,
  changeStartIndex,
} = searchValuesSlice.actions;
export default searchValuesSlice.reducer;
