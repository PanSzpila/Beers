import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import filtersReducer from "./filters";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    filters: filtersReducer,
  },
});

/* // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch */
