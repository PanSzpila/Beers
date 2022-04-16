import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    page: 1,
    per_page: 25,
    abv_gt: undefined,
    abv_lt: undefined,
    beer_name: undefined,
    brewed_before: undefined,
    brewed_after: undefined,
    malt: undefined,
    food: undefined,
  },
  reducers: {
    changeFilterPage: (state, action) => {
      (state.page = action), payload;
    },
    changeFilterAbv_gt: (state, action) => {
      (state.abv_gt = action), payload;
    },

    /*    increment: (state) => {

      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    }, */
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = filtersSlice.actions;

export default filtersSlice.reducer;
