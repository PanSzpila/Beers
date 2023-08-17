import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  per_page: 25,
  abv_gt: null,
  abv_lt: null,
  beer_name: null,
  brewed_before: null,
  brewed_after: null,
  malt: null,
  food: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilterPage: (state, action) => {
      state.page = action.payload;
    },
    changeFilterPageIncrement: (state) => {
      state.page += 1;
    },
    changeFilterPageDecrement: (state) => {
      state.page -= 1;
    },
    changeFilterPer_page: (state, action) => {
      state.per_page = action.payload;
    },
    changeFilterAbv_gt: (state, action) => {
      state.abv_gt = action.payload;
    },
    changeFilterAbv_lt: (state, action) => {
      state.abv_lt = action.payload;
    },
    changeFilterBeer_name: (state, action) => {
      state.beer_name = action.payload;
    },
    changeFilterBrewed_before: (state, action) => {
      state.brewed_before = action.payload;
    },
    changeFilterBrewed_after: (state, action) => {
      state.brewed_after = action.payload;
    },
    changeFilterMalt: (state, action) => {
      state.malt = action.payload;
    },
    changeFilterFood: (state, action) => {
      state.food = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  changeFilterPage,
  changeFilterPageIncrement,
  changeFilterPageDecrement,
  changeFilterPer_page,
  changeFilterAbv_gt,
  changeFilterAbv_lt,
  changeFilterBeer_name,
  changeFilterBrewed_before,
  changeFilterBrewed_after,
  changeFilterMalt,
  changeFilterFood,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
