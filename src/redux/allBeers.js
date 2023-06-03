import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "./store";

const initialState = {
  beersList: [],
  reqStatus: "idle",
};

const urlWithFilters = () => {
  const filters = store?.getState().filters;
  const url = new URL("https://api.punkapi.com");
  url.pathname = "/v2/beers";

  const filterPairs = Object.entries(filters).filter(
    ([key, value]) => value !== null
  );
  const filterStrings = filterPairs.map(([key, value]) => `${key}=${value}`);
  const filterQuery = filterStrings.join("&");

  if (filterQuery) {
    url.search = "?" + filterQuery;
  }

  return url.href;
};

export const getBeersData = createAsyncThunk(
  "allBeers/getAllBeersData",
  async () => {
    const url = urlWithFilters();
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const beersSlice = createSlice({
  name: "beers",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getBeersData.pending, (state) => {
        state.reqStatus = "pending";
      })
      .addCase(getBeersData.rejected, (state) => {
        state.reqStatus = "rejected";
      })
      .addCase(getBeersData.fulfilled, (state, { payload }) => {
        state.beersList = payload;
        state.reqStatus = "fulfilled";
      });
  },
});

const { reducer } = beersSlice;

export default reducer;
