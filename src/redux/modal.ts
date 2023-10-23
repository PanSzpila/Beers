import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ModalState {
  show: boolean;
  description: string;
}

const initialState: ModalState = {
  show: false,
  description:
    "In your search, minimal percentage of acohol must be lower than maximal.",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
    changeModalDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    resetModalToDefault: () => initialState,
  },
});

export const {
  showModal,
  hideModal,
  changeModalDescription,
  resetModalToDefault,
} = modalSlice.actions;

export default modalSlice.reducer;
