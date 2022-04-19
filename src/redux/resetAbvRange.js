import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
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
      state.count = action.payload;
    },
  },
});
export const { resetAbvRangeTrue, resetAbvRangeFalse, resetAbvRange } =
  counterSlice.actions;

export default counterSlice.reducer;
