import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookID = {
  id: string;
};

const initialState: BookID = {
  id: "",
};

const bookByIdSlice = createSlice({
  name: "BookById",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setId } = bookByIdSlice.actions;
export default bookByIdSlice.reducer;
