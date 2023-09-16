import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ActualItemState {
  id: number | null;
}

const initialState: ActualItemState = {
  id: null,
};

export const actualItemSlice = createSlice({
  name: "actualItem",
  initialState,
  reducers: {
    actualItemId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { actualItemId } = actualItemSlice.actions;

export const selectActualItem = (state: RootState) => state.actualItem.id;

export default actualItemSlice.reducer;
