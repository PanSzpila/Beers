import { createSlice } from "@reduxjs/toolkit";

export const resetAbvSlice = createSlice({
  name: "resetAbvRange",
  initialState: { reset: false },
  reducers: {
    resetAbvRangeTrue: (state) => {
      state.reset = true;
    },
    resetAbvRangeFalse: (state) => {
      state.reset = false;
    },
    resetAbvRange: (state, action) => {
      state.reset = action.payload;
    },
  },
});
export const { resetAbvRangeTrue, resetAbvRangeFalse, resetAbvRange } =
  resetAbvSlice.actions;

export default resetAbvSlice.reducer;
