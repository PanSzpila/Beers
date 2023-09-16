import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filters";
import resetAbvRangeReducer from "./resetAbvRange";
import actualItemReducer from "./actualItem";
import allBeersReducer from "./allBeers";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    resetAbvRange: resetAbvRangeReducer,
    actualItem: actualItemReducer,
    allBeers: allBeersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
