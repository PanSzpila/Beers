import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const actualItemSlice = createSlice({
  name: "actualItem",
  initialState: { id: null },
  reducers: {
    actualItemId: (state, action) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actualItemId } = actualItemSlice.actions;

export default actualItemSlice.reducer;
