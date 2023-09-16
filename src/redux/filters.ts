import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface FiltersState {
  page: number;
  per_page: number;
  abv_gt: number | null;
  abv_lt: number | null;
  beer_name: string | null;
  brewed_before: string | null;
  brewed_after: string | null;
  malt: string | null;
  food: string | null;
}

const initialState: FiltersState = {
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
    changeFilterPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeFilterPageIncrement: (state) => {
      state.page += 1;
    },
    changeFilterPageDecrement: (state) => {
      state.page -= 1;
    },
    changeFilterPer_page: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload;
    },
    changeFilterAbv_gt: (state, action: PayloadAction<number>) => {
      state.abv_gt = action.payload;
    },
    changeFilterAbv_lt: (state, action: PayloadAction<number>) => {
      state.abv_lt = action.payload;
    },
    changeFilterBeer_name: (state, action: PayloadAction<string>) => {
      state.beer_name = action.payload;
    },
    changeFilterBrewed_before: (state, action: PayloadAction<string>) => {
      state.brewed_before = action.payload;
    },
    changeFilterBrewed_after: (state, action: PayloadAction<string>) => {
      state.brewed_after = action.payload;
    },
    changeFilterMalt: (state, action: PayloadAction<string>) => {
      state.malt = action.payload;
    },
    changeFilterFood: (state, action: PayloadAction<string>) => {
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

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
